import { ViewBase } from "@nativescript/core";
import { HTMLElementTagNameMap, HTMLElement } from "dominative";

declare global {
  function __sveltets_mapElementTag(
    tag: any
  ): HTMLElement<ViewBase>;
  
  namespace svelteNative.JSX {
    function mapElementTag(tag: any): HTMLElement<ViewBase>;
    function createElement<
      Element extends NSDefaultComponents,
      Key extends keyof NSDefaultComponents
    >(
      element: keyof NSDefaultComponents | undefined | null,
      attrs: Element[Key]
    ): Element[Key];

    function createElement<
      Element extends NSDefaultComponents,
      Key extends keyof NSDefaultComponents,
      T
    >(
      // "undefined | null" because of <svelte:element>
      element: keyof NSDefaultComponents | undefined | null,
      attrsEnhancers: T,
      attrs: Element[Key] & T
    ): Element[Key];

    type NSDefaultComponents = {
      [K in keyof HTMLElementTagNameMap as `${Lowercase<K>}`]: HTMLElementTagNameMap[K];
    };
    interface IntrinsicElements extends NSDefaultComponents {}
  }
}

export {}