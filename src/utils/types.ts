export type Option = {
    label: string;
    value: string;
    name: string;
};

export type EntryFilters = {
    order?: string;
    date?: string;
    search?: string;
    favorite: boolean | string;
};

export type Entry = {
    id: number;
    title: string;
    body: string;
    created_at: string;
    favorite: boolean;
};
