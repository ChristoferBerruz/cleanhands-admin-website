import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const ReportTable: React.FC = () => {
    return (
        <div className="section">
            <div className="container">
                <table className="table is-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Average Handwashing time</th>
                            <th>Minimum time</th>
                            <th>Maximum time</th>
                            <th>No. of users</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
};
const ReportContent: React.FC = () => {
    return (
        <>
            <ReportTable />
        </>
    );
};
const Report: React.FC = () => {
    return (
        <>
            <Header />
            <ReportContent />
            <Footer />
        </>
    );
};

export default Report;
