import React from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

function AddTask() {
    return (
        <Card className="p-6 border-0 ">
            <div className='flex flex gap-3 md:flex-col'>
                <Input
                    type="text"
                    placeholder="Muốn làm gì?"
                    className="h-10 text-base "
                />
                <Button
                    size="lg"
                    className="px-6"
                >
                    <Plus/>
                    Thêm
                </Button>
            </div>
        </Card>
    );
}

export default AddTask;