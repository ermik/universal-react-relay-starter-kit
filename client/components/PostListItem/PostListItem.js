import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import PropTypes from 'prop-types'

import Tile from './Tile'
import { AspectRatio, TileContent } from '../Grid'

const PostListItem = ({ post, onClick }) => (
  <Tile onClick={onClick}>
    <AspectRatio ratio={0.75}>
      <TileContent>
        <img
          style={{ width: '100%', height: '100%' }}
          src={post.image}
          alt={post.title}
        />
      </TileContent>
    </AspectRatio>
  </Tile>
)

PostListItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default createFragmentContainer(
  PostListItem,
  graphql`
    fragment PostListItem_post on Post {
      title
      image
    }
  `,
)
