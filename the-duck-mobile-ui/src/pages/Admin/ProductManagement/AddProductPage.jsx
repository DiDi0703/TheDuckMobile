import { FormControl, FormLabel, Grid, MenuItem, Paper, Select, Typography, styled } from "@mui/material";
import FlexContainer from "../../../components/FlexContainer";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { useState } from "react";

const FormAddProduct = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    width: "80%",
    backgroundColor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
}));

const CustomImage = styled('img')(({ theme }) => ({
    marginTop: theme.spacing(2),
    border: "1px solid",
    borderRadius: "5px",
    height: "315px",
    width: "auto",
    maxWidth: "315px",
}));

function AddProductPage() {
    const [brand, setBrand] = useState('');
    const [catalog, setCatalog] = useState('');
    const [os, setOS] = useState('');
    const [image, setImage] = useState();

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleOSChange = (event) => {
        setOS(event.target.value);
    };

    const handleCatalogChange = (event) => {
        setCatalog(event.target.value);
    };

    return (
        <FlexContainer justifyContent="center">
            <FormAddProduct>
                <Typography variant="h3">Thêm sản phẩm mới</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={7}>

                        <MuiTextFeild
                            label="Tên sản phẩm"
                            margin="normal"
                            autoFocus
                            required
                        />

                        <MuiTextFeild
                            label="Số lượng"
                            margin="normal"
                            required
                        />

                        <MuiTextFeild
                            label="Mô tả"
                            margin="normal"
                            required
                            multiline
                            rows={8}
                        />

                    </Grid>
                    <Grid item xs={5}>

                        <CustomImage src={image} />

                        <MuiTextFeild
                            type="file"
                            required
                            onChange={handleImageChange}
                            sx={{ mt: 2 }}
                        />
                    </Grid>
                </Grid>

                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Danh mục</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={catalog}
                        onChange={handleCatalogChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Danh Mục</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 1 }}>
                    <FormLabel><Typography>Thương hiệu</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={brand}
                        onChange={handleBrandChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Thương Hiệu</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, mb: 2 }}>
                    <FormLabel><Typography>Hệ điều hành</Typography></FormLabel>
                    <Select
                        displayEmpty
                        value={os}
                        onChange={handleOSChange}
                    >
                        <MenuItem disabled value="">
                            <em>Lựa Chọn Hệ Điều Hành</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </FormAddProduct>
        </FlexContainer>
    );
}

export default AddProductPage;