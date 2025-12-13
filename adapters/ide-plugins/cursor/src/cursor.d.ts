declare module 'cursor' {
    export namespace window {
        export function showErrorMessage(message: string): Promise<string | undefined>;
        export function showInformationMessage(message: string): Promise<string | undefined>;
        export const activeTextEditor: TextEditor | undefined;
        export function showTextDocument(document: TextDocument, options?: { preview?: boolean; viewColumn?: ViewColumn }): Promise<TextEditor>;
        export function withProgress<R>(
            options: ProgressOptions,
            task: (progress: Progress<{ message?: string; increment?: number }>, token: CancellationToken) => Promise<R>
        ): Promise<R>;
    }

    export namespace workspace {
        export function openTextDocument(options?: { content?: string; language?: string }): Promise<TextDocument>;
    }

    export enum ViewColumn {
        Active = -1,
        Beside = -2,
        One = 1,
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5,
        Six = 6,
        Seven = 7,
        Eight = 8,
        Nine = 9
    }

    export enum ProgressLocation {
        SourceControl = 1,
        Window = 10,
        Notification = 15
    }

    export interface TextEditor {
        document: TextDocument;
        selection: Selection;
    }

    export interface TextDocument {
        getText(range?: Range): string;
        languageId: string;
        fileName: string;
        uri: Uri;
    }

    export interface Selection extends Range {
        isEmpty: boolean;
    }

    export interface Range {
        start: any;
        end: any;
    }

    export interface Uri {
        fsPath: string;
    }

    export interface ProgressOptions {
        location: ProgressLocation;
        title?: string;
        cancellable?: boolean;
        message?: string;
    }

    export interface Progress<T> {
        report(value: T): void;
    }

    export interface CancellationToken {
        isCancellationRequested: boolean;
        onCancellationRequested: any;
    }
}
