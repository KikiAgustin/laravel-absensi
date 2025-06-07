import { Link } from "@inertiajs/react";

function Pagination({ links }) {
    return (
        <div className="flex gap-2 mt-4 justify-center">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={
                        link.active
                            ? "bg-indigo-600 text-white px-4 py-2 border border-indigo-600 rounded-md"
                            : "text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 border rounded-md"
                    }
                />
            ))}
        </div>
    );
}

export default Pagination;
