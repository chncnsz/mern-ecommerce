import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Col, Container, Row } from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size, 
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit
    } = props;

    console.log({expandedArray, checkedArray})

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
            size={size}
        >
            <Row>
                <Col>
                    <h6>Genişletilen</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 && expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>Kategori Seç</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select 
                                className="form-control" 
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type',e.target.value, index, 'expanded')}
                            >
                                <option>Türü Seç</option>
                                <option value="store">store</option>
                                <option value="product">product</option>
                                <option value="page">page</option>

                            </select>
                        </Col>
                    </Row>
                )
            }


            <h6>İşaretlenen</h6>

            {
                checkedArray.length > 0 && checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={'Category Name'}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>Kategori Seç</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select 
                                className="form-control" 
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type',e.target.value, index, 'checked')}
                            >
                                <option>Türü Seç</option>
                                <option value="store">store</option>
                                <option value="product">product</option>
                                <option value="page">page</option>

                            </select>
                        </Col>
                    </Row>
                )
            }

        </Modal>
    )
}

export default UpdateCategoriesModal;