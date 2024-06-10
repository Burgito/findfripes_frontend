export interface IFripePicture {
    filename: string;
}

export interface IFripe {
    id: number;
    name: string;
    shortDescription: string;
    longDescription: string;
    fripePictures: IFripePicture[];
}