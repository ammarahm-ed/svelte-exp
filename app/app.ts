import 'svelte-native'
import { Application } from "@nativescript/core";
import {
    aliasTagName, document,
    register
} from "dominative";
import App from "./App.svelte";

register(global);
aliasTagName((tag) => tag.toLowerCase());
//@ts-ignore
const app = new App({ target: document });
//@ts-ignore
Application.run({ create: () => app.$$.root });