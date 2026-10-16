"use client";

import React from "react";
import Masthead from "./Masthead";
import ContentsRail from "./ContentsRail";
import ChapterOpening from "./ChapterOpening";
import ChapterTrade from "./ChapterTrade";
import ChapterPlates from "./ChapterPlates";
import ChapterLetters from "./ChapterLetters";
import ChapterAlmanac from "./ChapterAlmanac";
import Colophon from "./Colophon";

/**
 * VINTAGE EDITORIAL HOMEPAGE
 * Old-school, print-derived layout: paper ground, generous side margins,
 * a single readable column of text, marginalia, plates and a colophon.
 */
export default function EditorialHome() {
  return (
    <div className="ed-page">
      <div className="ed-sheet">
        <Masthead />

        <div className="ed-body">
          <div className="ed-main">
            <ChapterOpening />
            <ChapterTrade />
            <ChapterPlates />
            <ChapterLetters />
            <ChapterAlmanac />
          </div>

          <ContentsRail />
        </div>

        <Colophon />
      </div>
    </div>
  );
}
