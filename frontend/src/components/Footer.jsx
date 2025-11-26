import React from 'react';

function Footer({completeCount = 0, activeCount = 0}) {
    return (
        <div>
            {completeCount + activeCount > 0 && (
                <div className='text-center'>
                    <p className='text-sm text-white'>
                        {
                            completeCount > 0 && (
                                <>
                                    Con vợ được quá nhở hoàn thành được {completeCount} việc rồi
                                    {
                                        activeCount > 0 && `, còn ${activeCount} việc nữa thôi. Nốt đê!`
                                    }
                                </>
                            )
                        }
                        {completeCount === 0 && activeCount > 0 && (
                            <>
                                Có {activeCount} việc đấy, bỏ điện thoại xuống bắt đầu làm đê!
                            </>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Footer;