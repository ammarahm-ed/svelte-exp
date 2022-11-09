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
      Key extends keyof IntrinsicElements
    >(
      element: Key | undefined | null,
      attrs: Element[Key]
    ): HTMLElementTagNameMap[Key];

    function createElement<
      Elements extends IntrinsicElements,
      Key extends keyof Elements,
      T
    >(
      // "undefined | null" because of <svelte:element>
      element: Key | undefined | null,
      attrsEnhancers: T,
      attrs: Elements[Key] & T
    ): HTMLElementTagNameMap<Key>;

    type NSDefaultComponents = {
      [K in keyof HTMLElementTagNameMap as `${Lowercase<K>}`]: HTMLElementTagNameMap[K];
    };
    interface IntrinsicElements extends NSDefaultComponents {}
  }
}

export {}