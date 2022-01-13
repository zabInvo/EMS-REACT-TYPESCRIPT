import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreateCompanyDialog from "./createCompanyDialog";
import UpdateCompanyDialog from "./updateCompanyDialog";
import DeleteCompanyDialog from "./deleteCompanyDialog";

import { useAppSelector } from "../../redux/reduxHook";
import { CompanyObject } from "../../redux/reducers/admin/companyReducer";

const dummyLogo = require("../../dummyCompany.jpeg");

export default function Companies() {
  const dispatch = useDispatch();
  const companies = useAppSelector((state) =>
    state.companyReducer.companies ? state.companyReducer.companies : []
  );
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_COMPANIES_REQUEST" });
  }, []);

  const [selectedCompany, setSelectedCompany] = useState<CompanyObject | any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };
  const toggleDeleteModal = () => {
    setDeleteModal(!showDeleteModal);
  };
  const setCompany = (item: CompanyObject) => {
    setSelectedCompany(item);
  };

  const renderList = companies.map((item: CompanyObject, index) => {
    return (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345, m: 2 }} elevation={5}>
          <CardMedia
            component="img"
            alt="green iguana"
            image={dummyLogo}
            sx={{ maxWidth: 350, maxHeight: 340 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.type}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.address}
            </Typography>
          </CardContent>
          <CardActions sx={{ mt: -1 }}>
            <Button
              color="error"
              size="small"
              onClick={() => {
                toggleDeleteModal();
                setCompany(item);
              }}
            >
              Delete
            </Button>
            <Button
              size="small"
              onClick={() => {
                toggleUpdateModal();
                setCompany(item);
              }}
            >
              Update
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" onClick={toggleModal}>
            Create Company
          </Button>
        </div>
      </Grid>
      {renderList}
      <CreateCompanyDialog isOpen={showModal} toggle={toggleModal} />
      <UpdateCompanyDialog
        isOpen={showUpdateModal}
        toggle={toggleUpdateModal}
        data={selectedCompany}
      />
      <DeleteCompanyDialog
        isOpen={showDeleteModal}
        toggle={toggleDeleteModal}
        data={selectedCompany}
      />
    </Grid>
  );
}
