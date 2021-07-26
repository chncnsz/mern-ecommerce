import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategory,
    getAllCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosCloudUpload,
    IoIosAdd,
    IoIosTrash
} from "react-icons/io";
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import './style.css';

const Category = () => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!category.loading) {
            setShow(false);
        }
    }, [category.loading]);

    const handleClose = () => {

        const form = new FormData();

        if (categoryName === "") {
            alert('Category name is required')
            setShow(false);
            return;
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const rendercategories = (categories) => {
        let mycategories = [];
        for (let category of categories) {
            mycategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && rendercategories(category.children)
                }
                // <li key={category.name}>
                //     {category.name}
                //     {category.children.length > 0 ? (<ul>{rendercategories(category.children)}</ul>) : null}
                // </li>
            );
        }
        // console.log(categories);
        return mycategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {

            options.push({
                value: category._id,
                parentId: category.parentId,
                name: category.name,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        // console.log(categories);
        const checkedArray = [];
        checked.length > 0 && checked.forEach((categoryid, index) => {
            const category = categories.find((category, _index) => categoryid == category.value);
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryid, index) => {
            const category = categories.find((category, _index) => categoryid == category.value);
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

        console.log({ checked, expanded, checkedArray, expandedArray, categories });
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...value, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...value, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        // console.log(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }

        setDeleteCategoryModal(false);
    }

    const renderDeleteCategoryModal = () => {
        // console.log('DELETE',checkedArray);
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h6>expanded</h6>
                {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h6>checked</h6>
                {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
            </Modal>
        )
    }

    const categoryList = createCategoryList(category.categories);

    return (

        <Layout sidebar>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash /><span>Sil</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload /><span>Düzenle</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>
                            {rendercategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={rendercategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Yeni Kategori Ekle'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Kategori Düzenle'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {/* Add Category */}
            {/* {renderAddCategoryModal()} */}
            {/* Edit Category */}
            {/* {renderUpdateCategoriesModal()} */}
            {/* Delete Category */}
            {renderDeleteCategoryModal()}
        </Layout>
    )
}

export default Category
