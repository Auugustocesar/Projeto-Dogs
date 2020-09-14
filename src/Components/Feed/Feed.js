import React from 'react';
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import PropTypes from 'prop-types'

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null)
  const [pages, setPages] = React.useState([1])
  const [infinite, setInfinite] = React.useState(true)

  React.useEffect(() => {
    let wait = false

    function infiniteScrolll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight
        if (scroll > height * .75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1])
          wait = true
          setTimeout(() => {
            wait = false
          }, 500)
        }
      }
    }

    window.addEventListener('wheel', infiniteScrolll)
    window.addEventListener('scroll', infiniteScrolll)

    return () => {
      window.removeEventListener('wheel', infiniteScrolll)
      window.removeEventListener('scroll', infiniteScrolll)
    }
  }, [infinite])

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
      {pages.map(page => <FeedPhotos key={page}
                                     user={user}
                                     page={page}
                                     setInfinite={setInfinite}
                                     setModalPhoto={setModalPhoto} />)}

    </div>
  );
};

Feed.defaultProps = {
  user: 0
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
}

export default Feed;
