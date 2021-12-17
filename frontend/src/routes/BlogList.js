import React, { useEffect } from "react";
import Blog from "../components/Blog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Toggle from "../components/Toggle";
import AddBlogForm from "../components/AddBlogForm";
import { initialize as initBlogs } from "../reducers/blogReducer";

const BlogList = ({ blogs }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initBlogs());
	}, [dispatch]);

	const blogList = blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

	return (
		<div>
			<Toggle buttonLabel="Create new blog">
				<AddBlogForm />
			</Toggle>
			<div id="blogs">{blogList}</div>
		</div>
	);
};

BlogList.propTypes = {
	blogs: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		initBlogs: () => {
			dispatch(initBlogs());
		},
	};
};

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
