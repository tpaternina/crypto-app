import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { CloseOutlined } from "@ant-design/icons";
import { hideSearchPage } from "store/home/actions";
import { ErrorList, LoadingList } from "components";
import { Background, MobileClose } from "styles";
import { StyledSearch } from "styles";

const { Option } = StyledSearch;

function MobileSearch(props) {
  const { open, destroy, hideSearchPage } = props;

  const search = useRef();

  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSelect = (id) => {
    setData([]);
    window.location.pathname = `/coins/${id}`;
  };

  const getCoinList = debounce(async (searchValue) => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${process.env.REACT_APP_SEARCH_LIST}/${searchValue}`
      );
      setData(data);
      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }, 500);

  useEffect(
    () => val && getCoinList(val),
    //eslint-disable-next-line
    [val]
  );

  useEffect(() => search.current.focus(), []);

  return (
    <Background open={open} destroy={destroy}>
      <MobileClose onClick={hideSearchPage}>
        <CloseOutlined />
        <span>Close</span>
      </MobileClose>
      <StyledSearch
        ref={search}
        showSearch
        placeholder="Search coin..."
        optionFilterProp="children"
        onSearch={setVal}
        onChange={handleSelect}
        onBlur={() => setData([])}
        showArrow={false}
        notFoundContent={
          (loading && <LoadingList />) || (error && <ErrorList />)
        }
        dropdownClassName="mobile-dropdown"
        aria-expanded="true"
        autoFocus
        size="large"
      >
        {data.map((coin) => (
          <Option key={`${coin.id}-${Math.random()}`} value={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()})
          </Option>
        ))}
      </StyledSearch>
    </Background>
  );
}

const mapStateToProps = (state) => ({
  open: state.home.openSearch,
  destroy: state.home.destroySearch,
});

const mapDispatchToProps = {
  hideSearchPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileSearch);
