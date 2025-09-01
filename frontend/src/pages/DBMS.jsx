import LabNavbar from "../components/LabNavbar";

const DBMSLab = () => {
    return(
        <>
        <LabNavbar 
        title={"DBMS Lab"}
        breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'DBMS Lab', link: '/dbms' },
            { label: 'SQL Queries' },
        ]}
        />
        </>
    );
}


export default DBMSLab;