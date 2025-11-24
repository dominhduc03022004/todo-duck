import React from 'react';

function Footer({completedTasksCount = 0, activeTasksCount = 0}) {
    return (
        <div>
            {completedTasksCount + activeTasksCount > 0 && (
                <div className='text-center'>
                    <p className='text-sm text-white'>
                        {
                            completedTasksCount > 0 && (
                                <>
                                    Con vợ được quá nhở hoàn thành được {completedTasksCount} việc rồi
                                    {
                                        activeTasksCount > 0 && `, còn ${activeTasksCount} việc nữa thôi. Nốt đê!`
                                    }
                                </>
                            )
                        }
                        {completedTasksCount === 0 && activeTasksCount > 0 && (
                            <>
                                Có {activeTasksCount} việc đấy, bỏ điện thoại xuống bắt đầu làm đê!
                            </>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Footer;