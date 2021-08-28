import { ContentLoading, TableCol, TableRow } from "styles";

export default function LoadingCoins() {
  return (
    <>
      {[...Array(5)].map((item) => (
        <TableRow key={Math.random()}>
          <TableCol xs={3} sm={4} md={3} lg={3} xl={2} xxl={2} rank="true">
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={6} sm={4} md={6} lg={4} xl={4} xxl={4}>
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={6} sm={4} md={3} lg={3} xl={2} xxl={2}>
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={4} sm={4} md={2} lg={2} xl={2} xxl={2}>
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={5} sm={4} md={2} lg={2} xl={2} xxl={2}>
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={0} sm={4} md={2} lg={2} xl={2} xxl={2}>
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={0} sm={0} md={6} lg={4} xl={3} xxl={3}>
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={0} sm={0} md={0} lg={4} xl={3} xxl={3}>
            <ContentLoading color="#33363e" />
          </TableCol>
          <TableCol xs={0} sm={0} md={0} lg={0} xl={4} xxl={4}>
            <ContentLoading color="#33363e" />
          </TableCol>
        </TableRow>
      ))}
    </>
  );
}
