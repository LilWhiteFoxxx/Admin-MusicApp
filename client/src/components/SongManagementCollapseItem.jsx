// components
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
import SubmenuTrigger from "@ui/SubmenuTrigger";
// import { Checkbox } from "antd";

// utils
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";

const SongManagementCollapseItem = ({
  product,
  activeCollapse,
  handleCollapse,
}) => {
  const { stock } = product;
  console.log("check");

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Checkbox />
          <div className="flex items-center gap-2.5">
            <div className="img-wrapper w-[40px] h-[40px] flex items-center justify-center">
              <img src={product.image} alt="product" />
            </div>
            <h6 className="text-sm max-w-[70px] truncate">{product.id}</h6>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${
              activeCollapse !== product.id ? "active" : ""
            }`}
            aria-label="Toggle view"
            onClick={() => handleCollapse(product.id)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
          <NavLink to="/product-editor" aria-label="Edit">
            <i className="icon icon-pen-to-square-regular" />
          </NavLink>
          <SubmenuTrigger />
        </div>
      </div>
      <Collapse in={activeCollapse === product.id}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Product</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="flex gap-2.5">
                  <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
                    <img src={product.image} alt="product" />
                  </div>
                  <h6 className="text-sm max-w-[155px]">{product.name}</h6>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>SKU: {product.id}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                Stock status:
                {stock == null ? (
                  "On Demand"
                ) : (
                  <span>
                    <span
                      className={`${stock !== 0 ? "text-green" : "text-red"}`}
                    >
                      {stock !== 0
                        ? stock >= 10
                          ? " In stock "
                          : " Low Inventory "
                        : " Out of stock "}
                    </span>
                    ({stock})
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>Price: ${product.price}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                Category:
                <button className="capitalize text-accent ml-1">
                  {product.category}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

SongManagementCollapseItem.propTypes = {
  product: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default SongManagementCollapseItem;
