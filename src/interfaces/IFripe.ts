export interface IFripePicture {
    filename: string;
}

export interface IFripe {
    name: string;
    shortDescription: string;
    longDescription: string;
    fripePictures: IFripePicture[];
}