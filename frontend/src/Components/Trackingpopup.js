import React from 'react';

function TrackingPopup({ timelineData, onClose }) {
    const statusOrder = ['Created', 'Confirmed', 'Allocated', 'Shipment Created', 'Delivered'];

    // Get the current status from the last entry in timelineData
    const currentStatus = timelineData.length > 0
        ? timelineData[timelineData.length - 1].status
        : 'Created';

    // Determine if a status is completed or current
    const isStatusCompleted = (status) => {
        return statusOrder.indexOf(status) < statusOrder.indexOf(currentStatus);
    };

    const isStatusCurrent = (status) => {
        return status === currentStatus;
    };

    // Find the description and timestamp for a given status from timelineData
    const getStatusDetails = (status) => {
        const entry = timelineData.find(item => item.status === status);
        return {
            description: entry ? entry.description : '',
            timestamp: entry ? entry.timestamp : null,
        };
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                width: '90%',
                maxWidth: '400px',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                    <h5 style={{ margin: 0 }}>Order Tracking</h5>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '18px',
                            cursor: 'pointer',
                        }}
                    >
                        <i className="las la-times"></i>
                    </button>
                </div>

                {/* Stepper Timeline - Show all statuses */}
                <div style={{ padding:'20px' }}>
                    {statusOrder.map((status, index) => {
                        const isCompleted = isStatusCompleted(status);
                        const isCurrent = isStatusCurrent(status);
                        const isLastItem = index === statusOrder.length - 1;
                        const { description, timestamp } = getStatusDetails(status);

                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    marginBottom: isLastItem ? '0' : '15px',
                                    position: 'relative',
                                }}
                            >
                                {/* Timeline connector line */}
                                {!isLastItem && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '30px',
                                        left: '15px',
                                        width: '2px',
                                        height: 'calc(100% + 15px)',
                                        backgroundColor: isCompleted ? '#28a745' : '#e9ecef',
                                        zIndex: 1,
                                    }}></div>
                                )}

                                {/* Step Circle */}
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: isCompleted ? '#28a745' : isCurrent ? '#007bff' : '#e9ecef',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: isCompleted || isCurrent ? 'white' : '#6c757d',
                                    marginRight: '15px',
                                    flexShrink: 0,
                                    position: 'relative',
                                    zIndex: 2,
                                }}>
                                    {isCompleted ? (
                                        <i className="las la-check"></i>
                                    ) : isCurrent ? (
                                        index + 1
                                    ) : (
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: '#6c757d',
                                        }}></div>
                                    )}
                                </div>

                                {/* Step Content */}
                                <div style={{
                                    flex: 1,
                                    paddingBottom: isLastItem ? '0' : '15px',
                                }}>
                                    <h6 style={{
                                        margin: '0 0 5px 0',
                                        fontSize: '14px',
                                        color: isCompleted ? '#28a745' : isCurrent ? '#007bff' : '#6c757d',
                                        fontWeight: '500',
                                    }}>
                                        {status}
                                    </h6>
                                    {description && (
                                        <p style={{
                                            margin: '0 0 5px 0',
                                            fontSize: '12px',
                                            color: '#6c757d'
                                        }}>
                                            {description}
                                        </p>
                                    )}
                                    {timestamp && (
                                        <small style={{
                                            fontSize: '11px',
                                            color: '#adb5bd'
                                        }}>
                                            {new Date(timestamp).toLocaleString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TrackingPopup;
