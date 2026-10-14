#!/usr/bin/env python3
"""Write drafts.js, a catalog of every HTML file except the site index."""

from __future__ import annotations

import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "drafts.js"
HEADING_TAGS = {f"h{level}" for level in range(1, 7)}


class Outline(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.headings: list[dict[str, object]] = []
        self._skip = 0
        self._in_title = False
        self._title_parts: list[str] = []
        self._heading: int | None = None
        self._heading_id = ""
        self._parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"script", "style"}:
            self._skip += 1
            return
        if self._skip:
            return
        if tag == "title":
            self._in_title = True
            return
        if tag in HEADING_TAGS and self._heading is None:
            self._heading = int(tag[1])
            self._heading_id = dict(attrs).get("id") or ""
            self._parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style"} and self._skip:
            self._skip -= 1
            return
        if tag == "title":
            self._in_title = False
            self.title = " ".join("".join(self._title_parts).split())
            return
        if self._heading is not None and tag == f"h{self._heading}":
            text = " ".join("".join(self._parts).split())
            if text:
                heading: dict[str, object] = {"level": self._heading, "text": text}
                if self._heading_id:
                    heading["id"] = self._heading_id
                self.headings.append(heading)
            self._heading = None
            self._parts = []

    def handle_data(self, data: str) -> None:
        if self._skip:
            return
        if self._in_title:
            self._title_parts.append(data)
        if self._heading is not None:
            self._parts.append(data)


def html_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() != ".html":
            continue
        relative = path.relative_to(ROOT)
        if relative.as_posix() == "index.html":
            continue
        if any(part.startswith(".") for part in relative.parts):
            continue
        files.append(path)

    def sort_key(path: Path) -> tuple[bool, str, str]:
        parent, _, name = path.relative_to(ROOT).as_posix().rpartition("/")
        return (parent != "", parent.lower(), name.lower())

    return sorted(files, key=sort_key)


def catalog_entry(path: Path) -> dict[str, object]:
    relative = path.relative_to(ROOT).as_posix()
    try:
        raw = path.read_text(encoding="utf-8-sig", errors="replace")
    except OSError:
        raw = ""
    outline = Outline()
    outline.feed(raw)
    title = outline.title
    if not title:
        for heading in outline.headings:
            if heading["level"] == 1:
                title = str(heading["text"])
                break
    if not title:
        title = path.stem
    return {"path": relative, "title": title, "headings": outline.headings}


def main() -> None:
    payload = {"files": [catalog_entry(path) for path in html_files()]}
    text = "window.DRAFTS = " + json.dumps(payload, indent=2, ensure_ascii=False) + ";\n"
    if OUT.is_file() and OUT.read_text(encoding="utf-8") == text:
        return
    OUT.write_text(text, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    main()
