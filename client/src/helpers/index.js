export const getThumbnailUrl = url => {
    const parts = url.split("upload/");
    const newUrl = parts[0] + "upload/w_60,h_60/" + parts[1];
    return newUrl;
};

export const getDetailImageUrl = url => {
    const parts = url.split("upload/");
    const newUrl = parts[0] + "upload/h_400/" + parts[1];
    return newUrl;
};
