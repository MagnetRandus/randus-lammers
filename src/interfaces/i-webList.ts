interface RootObject {
    __metadata: Metadata;
    Id: string;
    Title: string;
}

interface Metadata {
    id: string;
    uri: string;
    etag: string;
    type: string;
}

export default RootObject;