import { useContext, useEffect } from "react"
import { Row, Col, Carousel, Spinner} from "react-bootstrap"
import { Link } from "react-router-dom"
import { ExamContext } from "../../contexts/ExamContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ScrollButton from '../layout/ScrollButton'

const Home = () => {
  const {examState: {subjects, subjectsLoading}, getSubjects} = useContext(ExamContext)

  useEffect(() => {getSubjects()}, [])

  if (subjectsLoading)
    return (
      <div className='d-flex justify-content-center mt-2'>
          <Spinner animation='border' variant='info' />
      </div>
    )

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/736x/1f/a7/0c/1fa70ced77406850449774062c03fabf.jpg"
            alt="First slide"
            style={{height: 330, borderRadius: 16}}
          />
          <Carousel.Caption>
            <p style={{fontSize: 26}}>Trắc nghiệm Tiếng Anh</p>
            <p>Tổng hợp hàng trăm câu trắc nghiệm Tiếng Anh Online giúp bạn ôn luyện và đạt điểm tốt trong các kỳ thi Tiếng Anh</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg"
            alt="Second slide"
            style={{height: 330, borderRadius: 16}}
          />

          <Carousel.Caption>
            <p style={{fontSize: 26}}>Trắc nghiệm Toán</p>
            <p>Ngân hàng đề đa dạng câu hỏi, phù hợp với mọi trình độ học vấn khác nhau.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.itl.cat/pngfile/big/294-2941154_kaziranga-national-park.jpg"
            alt="Third slide"
            style={{height: 330, borderRadius: 16}}
          />
          <Carousel.Caption>
            <p style={{fontSize: 26}}>Trắc nghiệm Kỳ thi THPT Quốc gia</p>
            <p>Tổng hợp kiến thức, sẵn sàng cho kỳ thi Trung học phổ thông Quốc Gia 2022.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        <div className="mt-4 mb-2 home-link">
          <span style={{fontSize: 26}}>Các môn thi</span>
          <Link style={{fontSize: 17, textDecoration: 'underline'}} className="text-info" to='/exams'>
            <span style={{marginRight: 5}}>Xem chi tiết</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </div>
        <Row>
          {subjects.map(subject => (
            <Col sm={4} key={subject.code}>
              <Link className="img_subject" to={`/exams?code=${subject.code}`} variant="top" style={{backgroundImage: `url(${subject.img})`}}>
                <button className="btn-subject">Xem đề thi</button>
              </Link>
              <p style={{fontSize: 20}} className="text-center mb-4 mt-2">{subject.title}</p>
            </Col>
          ))}
        </Row>
        <ScrollButton/>
    </>

  )
}

export default Home