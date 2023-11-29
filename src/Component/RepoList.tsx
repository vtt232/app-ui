import React, { useEffect, useState } from "react";
import apiService from '../ApiCaller/ApiCaller'; 
import {Repo, RepoListPropsType } from "../Type/RelatedRepoType";
import { useNavigate } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Box } from '@mui/material';

function RepoList(props: RepoListPropsType) {



    const onViewNoteOfRepo = (repoId: number, repoName: string, event: React.MouseEvent<HTMLTableRowElement>) => {
      props.pickNote(repoId, repoName, event);
      props.openNoteListModal();
    }

    return (

      <Box display="flex" flexDirection="column" alignItems="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Link</TableCell>
              <TableCell align="center">Language</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((item, keyId) => (
              <TableRow key={keyId} onClick={(event) => onViewNoteOfRepo(item.id, item.name, event)}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.url}</TableCell>
                <TableCell>{item.language}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <Box mt={2}>
        <Button onClick={() => props.pagination.setValue(props.pagination.value - 1)} disabled={props.pagination.value === 0}>
          Previous
        </Button>
        <Button onClick={() => props.pagination.setValue(props.pagination.value + 1)}>
          Next
        </Button>
      </Box>
    </Box>
    )

}

export default RepoList;