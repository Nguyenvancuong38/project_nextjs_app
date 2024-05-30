'use client'

import React from 'react';
import CreateUser from '@/components/app.createUser';
import CreateDepartment from '@/components/app.createDepartment';
import CreateProduct from '@/components/app.createProduct';
import { withAuthentication } from '@/libs/hoc/withAuthentication';

const Create: React.FC = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center pt-14'>
            <CreateDepartment />
            <CreateProduct />
            <CreateUser />
        </div>
    );
} 

export default withAuthentication(Create, ['admin']);
