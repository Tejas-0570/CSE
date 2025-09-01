import LabNavbar from "../components/LabNavbar";

const OSLab = () => {
    return(
        <>
        <LabNavbar
        title="OS Lab"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'OS Lab', link: '/os' },
          { label: 'CPU Scheduling' },
        ]}
        />
        
        </>
    );
}

export default OSLab;