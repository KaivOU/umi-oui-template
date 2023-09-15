import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd';
interface ModalProps {
    visible?: boolean;
    children: any;
}
const Index: FC<ModalProps> = (props: ModalProps) => {
    const { visible, children } = props;
    const [isModalVisible, setIsModalVisible] = useState(visible);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {children}
            </Modal>
        </>
    );
};

export default Index;
