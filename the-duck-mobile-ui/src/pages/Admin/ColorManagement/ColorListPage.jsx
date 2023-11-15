import {
    Box,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    styled
} from "@mui/material";
import TablePaginationActions from "../../../components/TablePaginationActions";
import { useCallback, useContext, useEffect, useState } from "react";
import MuiButton from "../../../components/MuiButton";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Search } from "@mui/icons-material";
import MuiTextFeild from "../../../components/MuiTextFeild";
import { DataContext } from "../../../layouts/AdminLayout";

const RootPageColorList = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

const AddButton = styled(MuiButton)(({ theme }) => ({
    width: "25%",
    marginBottom: theme.spacing(1),
    "&:hover": {
        backgroundColor: "#FF6969",
    }
}));

const SearchTextField = styled(MuiTextFeild)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

function ColorListPage() {
    const { dataFetched } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsSearched, setRowsSearched] = useState([]);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        setRowsSearched(dataFetched);
    }, [dataFetched]);

    const filterRows = useCallback(
        (searchString) => {
            if (searchString === "") {
                return dataFetched;
            }
            return dataFetched.filter((row) =>
                row.colorName.toLowerCase().includes(searchString.toLowerCase())
            );
        },
        [dataFetched]
    );

    useEffect(() => {
        const filtered = filterRows(searchString);
        setRowsSearched(filtered);
    }, [searchString, filterRows]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsSearched.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <RootPageColorList>
            <Typography variant="h3">Danh sách màu sắc</Typography>
            <AddButton component={Link} variant="contained" color="color1" to="/admin/color-management/add">
                <Typography color={"white"}>
                    Thêm Màu Sắc Mới
                </Typography>
            </AddButton>
            <SearchTextField
                type="text"
                variant="outlined"
                component={Paper}
                placeholder="Tìm kiếm theo tên"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    style: { fontSize: 18 },
                }}
            />
            <TableContainer
                component={Paper}
                sx={{ maxHeight: 1070, minWidth: 1035, maxWidth: 1035 }}
            >
                <Table stickyHeader sx={{ maxWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Mã màu</TableCell>
                            <TableCell align="center">Tên màu</TableCell>
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Lựa chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rowsSearched.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rowsSearched
                        ).map((row) => (
                            <TableRow key={row.colorId}>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    {row.colorId}
                                </TableCell>
                                <TableCell style={{ minWidth: 150 }} align="center">
                                    {row.colorName}
                                </TableCell>
                                <TableCell style={{ minWidth: 100 }} align="center">
                                    {row.colorCode}
                                </TableCell>
                                <TableCell style={{ minWidth: 250 }} align="center">
                                    {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                                </TableCell>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    <MuiButton component={Link} color="oldPrimary"><InfoIcon /></MuiButton>
                                    <MuiButton component={Link} color="teal" to="/admin/color-management/edit"><EditIcon /></MuiButton>
                                    <MuiButton component={Link} color="color1"><DeleteIcon /></MuiButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={5}
                                count={rowsSearched.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ fontSize: 10 }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </RootPageColorList>
    );
}

export default ColorListPage;