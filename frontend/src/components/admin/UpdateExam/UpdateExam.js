import { faCaretLeft, faCaretRight, faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MathJax } from 'better-react-mathjax'
import { useContext, useEffect, useState } from 'react'
import { Button, Col, Pagination, Row, Spinner, Table } from 'react-bootstrap'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AdminContext } from '../../../contexts/AdminContext'
import SingleQuizUpdate from '../../single/SingleQuizUpdate/SingleQuizUpdate'
import ScrollButton from '../../layout/ScrollButton/ScrollButton'
import { ToastContainer } from 'react-toastify'


const UpdateExam = () => {
    const {slug} = useParams()
    const search = useLocation().search
    const [page, setPage] = useState(1)
    const pagesize = new URLSearchParams(search).get('pagesize') ?? 10
    const {examState: {exams, examsLoading, total}, getAllExams} = useContext(AdminContext)
    console.log(exams);
    useEffect(() => {
      const pageParam = new URLSearchParams(search).get('page') ?? 1
      setPage(+pageParam)
    }, [])

    useEffect(() => {
      getAllExams(slug, page, pagesize)
    }, [page])

    const handlePage = (e) => {
      setPage(+e.target.text)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    const handlePrevPage = () => {
      setPage(prev => prev-1)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    const handleNextPage = () => {
      setPage(prev => prev+1)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    
    if(examsLoading){
      return (
        <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
        </div>
      )} 
    else {
      const body = []
      let i
      for(i=1; i<=(Math.ceil(total/10)); i++) {
        body.push(
          <Button
            key={i}
            onClick={handlePage}
            to={{search: `?page=${i}&pagesize=${pagesize}`}}
            as={Link}
            className="btn-pag"
            active={page===i}
          >
            {i}
          </Button>)
      }
      return (
        <>
          <ToastContainer theme='colored' />
          <div className='home-link'>
            <Link to='/admin/exams-management'>Quay lại</Link>
            <Link to={`/admin/exams-management/create/${slug}`}>
              <button className='btn-nav text-success'>
                <FontAwesomeIcon icon={faCirclePlus}/>
                {" Thêm câu hỏi"}
              </button>
            </Link>
          </div>
          <Row>
            <Col>
              <MathJax>
                <Table striped hover responsive="lg">
                  <thead>
                    <tr>
                      <th width='40%' className='text-center'>Câu hỏi</th>
                      <th width='40%' colSpan={4} className='text-center'>Đáp án</th>
                      <th className='text-center'>Đ/án đúng</th>
                      <th className='text-center'>Tùy chỉnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.length !== 0 && exams.map(exam => (
                      <SingleQuizUpdate exam={exam} key={exam._id}/>
                    ))}
                  </tbody>
                </Table>
              </MathJax>
            </Col>
          </Row>
          <Row>
            <Col>
            
            <Pagination className='justify-content-center'>
              <Button 
                style={{pointerEvents: page>1 ? '' : 'none'}}
                onClick={handlePrevPage}
                to={{search: `?page=${page-1}&pagesize=${pagesize}`}}
                className={page<=1 ? 'disabled-link btn-pag' : 'btn-pag'}
                as={Link}
              >
                <FontAwesomeIcon icon={faCaretLeft}/>
              </Button>
                    {body.map(e => e)}
                <Button
                  style={{pointerEvents: page< Math.ceil(total/10)? '' : 'none'}}
                  onClick={handleNextPage}
                  to={{search: `?page=${page+1}&pagesize=${pagesize}`}}
                  className={page>=5 ? 'disabled-link btn-pag' : 'btn-pag'}
                  as={Link}
                >
                  <FontAwesomeIcon icon={faCaretRight}/>
                </Button>
            </Pagination>
  
              {/* <PaginationAptest total={total}/> */}
            </Col>
          </Row>
          
          <ScrollButton/>
        </>
      )
    }
    
}

export default UpdateExam