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
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EditIcon from '@mui/icons-material/Edit';
import MuiTextFeild from "../../../components/MuiTextFeild";
import { Search } from "@mui/icons-material";
import { DataContext } from "../../../layouts/AdminLayout";
import { enqueueSnackbar } from "notistack";
import { deleteOS, restoreOS } from "../../../services/Admin/OSService";
import DialogConfirm from "../../../components/DialogConfirm";

const RootPageOSList = styled(Box)(({ theme }) => ({
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

function OSListPage() {
    const navigate = useNavigate();
    const { dataFetched } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsSearched, setRowsSearched] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [isDeleted, setIsDeleted] = useState();
    const [id, setId] = useState("");
    const [index, setIndex] = useState(0);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const filterRows = useCallback(
        (searchString) => {
            setPage(0);
            if (searchString === "") {
                return dataFetched;
            }
            return dataFetched.filter((row) =>
                row.osName.toLowerCase().includes(searchString.toLowerCase())
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

    const handleTrashButtonClick = async () => {
        let response;
        const osList = [...dataFetched];
        if (isDeleted) {
            response = await restoreOS(id);
            if (response.success) {
                enqueueSnackbar("Khôi phục hệ điều hành thành công!", { variant: "success" });
                osList[index + page * rowsPerPage].isDeleted = !isDeleted;
                setRowsSearched(osList);
            } else {
                enqueueSnackbar("Khôi phục hệ điều hành thất bại!", { variant: "error" });
            }
        } else {
            response = await deleteOS(id);
            if (response.success) {
                enqueueSnackbar("Xóa hệ điều hành thành công!", { variant: "success" });
                osList[index + page * rowsPerPage].isDeleted = !isDeleted;
                setRowsSearched(osList);
            } else {
                enqueueSnackbar("Xóa hệ điều hành thất bại!", { variant: "error" });
            }
        }
    };

    return (
        <RootPageOSList>
            <Typography variant="h3">Danh sách hệ điều hành</Typography>
            <AddButton component={Link} variant="contained" color="color1" to="/admin/os-management/add">
                <Typography color={"white"}>
                    Thêm Hệ Điều Hành Mới
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
                            <TableCell align="center">Mã hệ điều hành</TableCell>
                            <TableCell align="center">Tên hệ điều hành</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Lựa chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rowsSearched.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rowsSearched
                        ).map((row, i) => (
                            <TableRow key={i}>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    {row.osId}
                                </TableCell>
                                <TableCell style={{ minWidth: 150 }} align="center">
                                    {row.osName}
                                </TableCell>
                                <TableCell style={{ minWidth: 250 }} align="center">
                                    {row.isDeleted ? "Ngừng hoạt động" : "Còn hoạt động"}
                                </TableCell>
                                <TableCell style={{ minWidth: 200 }} align="center">
                                    <MuiButton
                                        color="teal"
                                        onClick={() => {
                                            navigate(`/admin/os-management/${row.osId}`, {
                                                state: {
                                                    editOS: row
                                                }
                                            })
                                        }}
                                    >
                                        <EditIcon />
                                    </MuiButton>
                                    <MuiButton
                                        component={Link}
                                        color="color1"
                                        onClick={(e) => {
                                            setIndex(i);
                                            setId(row.osId);
                                            setIsDeleted(row.isDeleted);
                                            setDeleteDialog(true);
                                        }}
                                    >
                                        {row.isDeleted ? <RestoreFromTrashIcon /> : <DeleteIcon />}
                                    </MuiButton>
                                    <DialogConfirm
                                        open={deleteDialog}
                                        title={isDeleted ? "Khôi phục hệ điều hành" : "Xóa hệ điều hành"}
                                        content={
                                            isDeleted
                                                ? "Bạn có chắc chắn muốn khôi phục hệ điều hành này"
                                                : "Bạn có chắc chắn muốn xóa hệ điều hành này?"
                                        }
                                        okText={isDeleted ? "Khôi phục" : "Khóa"}
                                        cancelText={"Hủy"}
                                        onOk={handleTrashButtonClick}
                                        onCancel={() => setDeleteDialog(false)}
                                        onClose={() => setDeleteDialog(false)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
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
        </RootPageOSList>
    );
}

export default OSListPage;