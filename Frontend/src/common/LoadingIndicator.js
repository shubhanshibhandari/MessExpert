import React from 'react';
import { Spin, } from 'antd';
import {PlusCircleOutlined ,DeleteOutlined ,CheckCircleOutlined ,Loading3QuartersOutlined}  from '@ant-design/icons';
import Icon from '@ant-design/icons';

export default function LoadingIndicator(props) {
    const antIcon = <Loading3QuartersOutlined  style={{ fontSize: 30 }} spin />;
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}