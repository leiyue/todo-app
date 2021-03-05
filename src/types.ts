/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefineComponent } from 'vue'

export type LayoutComponent = DefineComponent<{}, {}, any>

export type SubmitEvent = Event & {
  target: HTMLFormElement
}
