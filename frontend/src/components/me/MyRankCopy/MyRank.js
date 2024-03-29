import moment from "moment";
import React, { useContext, useEffect } from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { apiUrl } from "../../../contexts/constaints";
import { ExamContext } from "../../../contexts/ExamContext";
import "./MyRank.scss";

const MyRank = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  
  const {
    resultState: { results, resultsLoading, rankInfo, rankInfoLoading },
    getResult,
    getMyRank,
  } = useContext(ExamContext);
  
  console.log(rankInfo);

  useEffect(() => {
    getResult();
    getMyRank();
  }, []);

  const handleTime = (time) => {
    const minutes = Math.floor(time / 60);
    const second = time - minutes * 60;
    return minutes + " phút " + second + " giây";
  };

  let body = null;
  if (resultsLoading || rankInfoLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else
    body = (
      <>
        <div id="myrank">
          <div className="myrank__above">
            <span style={{ fontSize: 30 }}>Xếp hạng cá nhân</span>

            <div className="myrank__heading">
              <img
                className="myrank__heading__avt"
                src={user?.avt}
                alt="avatar"
              ></img>
              <p className="myrank__heading__name">{user.fullname}</p>
            </div>

            <div className="myrank__main">
              <div className="myrank__body">
                <div className="myrank__body__wrap">
                  <div className="myrank__body__wrap__title">Xếp hạng</div>
                  <div className="ranking__num myrank__body__wrap__num">{rankInfo?.rank}</div>
                </div>

                <div className="myrank__body__wrap">
                  <div className="myrank__body__wrap__title">Điểm tích lũy</div>
                  <div className="point__num myrank__body__wrap__num">{rankInfo?.point}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Row>
          <span style={{paddingTop: 80, fontSize: 30, textAlign: 'center'}}>Lịch sử thi gần nhất</span>
          <Col>
            <Table striped hover>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Môn thi</th>
                  <th>Số lần thi</th>
                  <th>Điểm</th>
                  <th>Thời gian làm bài</th>
                  <th>Ngày thi</th>
                </tr>
              </thead>
              {results.length === 0 ? (
                <tbody className="text-center">
                  <tr>
                    <td
                      colSpan={7}
                      className="pt-4"
                      style={{ fontSize: 20 }}
                    >
                      Bạn chưa thi môn nào
                    </td>
                  </tr>
                </tbody>
              ) : (
                results.map((result) => (
                  <tbody key={result._id}>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>{result.examName}</td>
                      <td>{result.frequency}</td>
                      <td>{result.result}</td>
                      <td>{handleTime(result.timeWork)}</td>
                      <td>{moment.utc(result.createdAt).format("L")}</td>
                    </tr>
                  </tbody>
                ))
              )}
            </Table>
          </Col>
          <Button to='/me/history' as={Link} style={{marginBottom: 20}}>Xem chi tiết</Button>
        </Row>
      </>
      );

  return <>{body}</>;
};

export default MyRank;
