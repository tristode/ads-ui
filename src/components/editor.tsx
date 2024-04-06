import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useCallback, useMemo, useState } from "react";

export default function Editor() {
    const [value, setValue] = useState("");
    const onChange = useCallback((val: string) => {
        console.log(val);
        setValue(val);
    }, []);
    const options = useMemo(() => ({ toolbar: false, status: false }), []);
    return (
        <SimpleMdeReact value={value} onChange={onChange} options={options} />
    );
}
