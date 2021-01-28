import { useEffect, useState } from "react";

export const useStaticJSON = (lang: "de" | "en", filename: string) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let newData;
        if (lang) newData = require(`../static/${filename}_${lang}.json`);

        if (data !== newData.content) {
            setData(newData.content)
        };
        console.log(data);
    }, [lang, data]);

    return data;
};