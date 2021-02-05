import m3u8 from "m3u8stream";
import miniget from "miniget";

declare module "xvdl" {

    export interface RelatedVideos {
        id: number;
        thumbnail: string;
        url: string;
        title: string;
        views: string;
        duration: string;
        channel: {
            name: string;
            url: string;
        };
    }

    export interface SearchData {
        id: string,
        title: string,
        url: string,
        duration: string;
        channel: {
            url: string;
            name: string;
        };
        thumbnail: {
            dynamic: string;
            static: string;
        };
    }

    export interface BrowseResult {
        videos: SearchData[];
    }

    export type SearchResult = BrowseResult;

    export interface DownloadOptions extends miniget.Options {
        type?: "hq" | "lq" | "hls";
    }

    export interface VideoInfo {
        title: string;
        length: number;
        views: number;
        streams: {
            hq: string;
            lq: string;
            hls: string;
        };
        thumbnail: string;
        relatedVideos: RelatedVideos[];
        ratings: {
            likes: string;
            dislikes: string;
        };
        comments: string;
        channel: {
            name: string;
            url: string;
            subscribers: string;
        };
    }

    export class Util {
        public static getHTML(url: string): Promise<string>;
        public static getDOM(html: string): Document;
        public static parseRelated(data: string): RelatedVideos[];
    }

    export class XVDL {
        public static browse(path?: string): Promise<BrowseResult>;
        public static getInfo(url: string): Promise<VideoInfo>;
        public static download(url: string, options: { type: "lq" }): Promise<miniget.Stream>;
        public static download(url: string, options: { type: "hq" }): Promise<miniget.Stream>;
        public static download(url: string, options: { type: "hls" }): Promise<m3u8.Stream>;
        public static download(url: string, options?: DownloadOptions): Promise<miniget.Stream|m3u8.Stream>;
        public static search(query: string, page?: number): Promise<SearchResult>;
    }

    export interface ConstantsInterface {
        BASE_URL: string;
        SEARCH_HEAD: string;
    };

    export const Constants: ConstantsInterface;
    export const version: string;
}