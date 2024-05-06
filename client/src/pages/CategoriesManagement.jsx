// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import CategoryManagementTable from "@widgets/CategoryManagementTable";

const CategoriesManagement = () => {
    return (
        <>
            <PageHeader title="Categories Management" />
            <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
                    <button className="btn btn--primary">
                        Add new category{" "}
                        <i className="icon-circle-plus-regular" />
                    </button>
                </div>
                <Search
                    wrapperClass="lg:w-[326px]"
                    placeholder="Search Product"
                />
            </div>
            <CategoryManagementTable />
        </>
    );
};

export default CategoriesManagement;
