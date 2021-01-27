import { useEffect, useState } from "react";

export const useStaticJSON = (lang: "de" | "en", filename: string) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let newProjects;
        if (lang) newProjects = require(`../static/${filename}_${lang}.json`);

        if (data !== newProjects.content) {
            setData(newProjects.content)
        };
        console.log(data);
    }, [lang, data]);

    return data;
};