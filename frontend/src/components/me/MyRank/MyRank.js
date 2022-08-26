import { faCrow, faCrown, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            <span className="myrank__title" style={{ fontSize: 40 }}>Xếp hạng cá nhân</span>

            <div className="myrank__head">
              <div className="myrank__head__wrap">
                <FontAwesomeIcon className="myrank__head__crown" icon={faCrown} />

                <img
                  className="myrank__head__avt"
                  src={user?.avt}
                  alt="avatar"
                ></img>

                <div className="myrank__medal1">
                  <div className="myrank__medal2">
                    <img
                      className="myrank__head__medal"
                      src="https://cdn-icons-png.flaticon.com/512/744/744984.png"
                      // src="https://cdn.pixabay.com/photo/2017/03/21/21/05/medal-2163345_1280.png"
                      alt="medal"
                    ></img>

                    <div className="myrank__head__top">{rankInfo?.rank}</div>
                  </div>
                </div>
              </div>

              <p className="myrank__head__name">{user.fullname}</p>
            </div>

            <div className="myrank__main">
              <div className="myrank__main__ribbon">
                <div className="myrank__main__ribbon__title"> 

                  Điểm tích lũy: {rankInfo?.point}
                  <FontAwesomeIcon className="myrank__star" icon={faStar} />

                </div>
              </div>
            </div>
          </div>
        </div>

        <Row>
          <span className="myrank__title" style={{paddingTop: 80, fontSize: 30, textAlign: 'center'}}>Lịch sử thi gần nhất</span>
          <Col>
            <Table striped hover>
              <thead>
                <tr>
                  <th></th>
                  <th>STT</th>
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
                results.map((result, index) => (
                  <tbody key={result._id}>
                    <tr>
                      <td></td>
                      <td>{index+1}</td>
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
