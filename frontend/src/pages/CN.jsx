import LabNavbar from "../components/LabNavbar";

const CNLab = () => {
    return(
        <>
        <LabNavbar 
        title={"CN Lab"}
        breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'CN Lab', link: '/cn' },
            { label: 'Network Protocols' },
        ]}
        />
        </>
    );
}

export default CNLab;