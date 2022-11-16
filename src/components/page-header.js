export default function PageHeader(props) {
    return (
        <div class="page-header d-print-none">
            <div class="container-xl">
                <div class="row g-2 align-items-center">
                    <div class="col">
                        <div class="page-pretitle">
                            {props.pretitle || "Overview"}
                        </div>
                        <h2 class="page-title">
                            {props.title || "Dashboard"}
                        </h2>
                    </div>
                    { props.children && 
                    <div class="col-12 col-md-auto ms-auto d-print-none">
                        {props.children}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}