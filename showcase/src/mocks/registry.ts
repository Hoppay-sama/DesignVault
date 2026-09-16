import type { ComponentType } from "react";
import { TerminusMock } from "./dither-mono/terminus";
import { LongwireMock } from "./dither-mono/longwire";
import { DuotoneMock } from "./dither-mono/duotone";
import { KovraMock } from "./cinematic/kovra";
import { LumenMock } from "./cinematic/lumen";
import { SwellMock } from "./cinematic/swell";
import { LongitudeMock } from "./vast/longitude";
import { ObjectLessonMock } from "./vast/object-lesson";
import { ClosingCreditsMock } from "./vast/closing-credits";

export interface MockEntry {
  path: string;
  style: string;
  direction: string;
  Component: ComponentType;
}

export const mocks: MockEntry[] = [
  {
    path: "/mocks/dither-mono/terminus",
    style: "Dither Mono",
    direction: "A - TERMINUS",
    Component: TerminusMock,
  },
  {
    path: "/mocks/dither-mono/longwire",
    style: "Dither Mono",
    direction: "B - LONGWIRE",
    Component: LongwireMock,
  },
  {
    path: "/mocks/dither-mono/duotone",
    style: "Dither Mono",
    direction: "C - DUOTONE",
    Component: DuotoneMock,
  },
  { path: "/mocks/cinematic/kovra", style: "Cinematic", direction: "A - KOVRA", Component: KovraMock },
  {
    path: "/mocks/cinematic/lumen",
    style: "Cinematic",
    direction: "B - LUMEN Mk. III",
    Component: LumenMock,
  },
  {
    path: "/mocks/cinematic/swell",
    style: "Cinematic",
    direction: "C - SWELL 41",
    Component: SwellMock,
  },
  {
    path: "/mocks/vast/longitude",
    style: "Vast Quiet",
    direction: "1 - LONGITUDE",
    Component: LongitudeMock,
  },
  {
    path: "/mocks/vast/object-lesson",
    style: "Vast Quiet",
    direction: "2 - OBJECT LESSON",
    Component: ObjectLessonMock,
  },
  {
    path: "/mocks/vast/closing-credits",
    style: "Vast Quiet",
    direction: "3 - CLOSING CREDITS",
    Component: ClosingCreditsMock,
  },
];
