import React from 'react';

const ConfirmationPage = ({transactionId}) => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className='card-header'>
                            <h1 className='card-title'>Transaction Confirmation</h1>
                        </div>
                        <div className="card-body">
                            <p className='pt-3'>Your transaction has been successfully processed with id: {transactionId}</p>
                        </div>
                        <div className="card-footer">
                             <p>Thank you for your purchase!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ConfirmationPage;