/* =========================================================
   SAHIMAAP - MANUFACTURER PRODUCTS
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL =
    "https://tceummqoawvmqqprzkpr.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_HicetVAd_hjnMlJtsjgEmw_x5WTKFci";


/* =========================================================
   SESSION
   ========================================================= */

function getManufacturerSession() {

    const raw =
        sessionStorage.getItem("currentManufacturer");

    if (!raw) {
        return null;
    }

    try {

        return JSON.parse(raw);

    } catch (error) {

        console.error(
            "Invalid manufacturer session:",
            error
        );

        return null;
    }
}


function getManufacturerId() {

    const manufacturer =
        getManufacturerSession();

    if (!manufacturer) {
        return "";
    }

    return String(
        manufacturer.id ||
        manufacturer.manufacturer_id ||
        ""
    ).trim();
}


/* =========================================================
   SUPABASE RPC
   ========================================================= */

async function callRpc(
    functionName,
    body = {}
) {

    const response =
        await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/${functionName}`,
            {
                method: "POST",

                headers: {
                    "apikey": SUPABASE_ANON_KEY,

                    "Authorization":
                        `Bearer ${SUPABASE_ANON_KEY}`,

                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/json"
                },

                body:
                    JSON.stringify(body)
            }
        );


    if (!response.ok) {

        let message =
            `Request failed (${response.status})`;

        try {

            const data =
                await response.json();

            message =
                data.message ||
                data.error_description ||
                data.hint ||
                data.details ||
                message;

        } catch (_) {}

        throw new Error(message);
    }


    const text =
        await response.text();

    if (!text.trim()) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (_) {
        return text;
    }
}


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let products = [];

let instrumentTypes = [];

let instrumentCategories = [];

let currentInstruments = [];

let currentProduct = null;

let currentInstrument = null;


/* =========================================================
   DOM
   ========================================================= */

const productList =
    document.getElementById(
        "product-list"
    );

const productListCard =
    document.getElementById(
        "product-list-card"
    );

const productsLoading =
    document.getElementById(
        "products-loading"
    );

const productsError =
    document.getElementById(
        "products-error"
    );

const productsEmpty =
    document.getElementById(
        "products-empty"
    );

const productsErrorMessage =
    document.getElementById(
        "products-error-message"
    );


/* =========================================================
   UTILITY
   ========================================================= */

function value(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value).trim();
}


function escapeHtml(text) {

    return value(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function formatDate(date) {

    const text =
        value(date);

    if (!text) {
        return "—";
    }

    return text.length >= 10
        ? text.substring(0, 10)
        : text;
}


/* =========================================================
   LOAD PRODUCTS
   ========================================================= */

async function loadProducts() {

    hideElement(productsError);
    hideElement(productsEmpty);
    hideElement(productListCard);

    showElement(productsLoading);


    const manufacturerId =
        getManufacturerId();


    if (!manufacturerId) {

        showProductsError(
            "Manufacturer session not found. Please login again."
        );

        return;
    }


    try {

        const result =
            await callRpc(
                "manufacturer_get_products",
                {
                    p_manufacturer_id:
                        manufacturerId
                }
            );


        products =
            Array.isArray(result)
                ? result
                : result
                    ? [result]
                    : [];


        renderProducts();


    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );

        showProductsError(
            error.message ||
            "Unable to load products."
        );

    } finally {

        hideElement(productsLoading);
    }
}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts() {

    productList.innerHTML = "";


    if (!products.length) {

        showElement(productsEmpty);

        return;
    }


    products.forEach(
        product => {

            const modelNumber =
                value(
                    product.model_number
                );

            const productCode =
                value(
                    product.product_code
                );

            const brand =
                value(
                    product.brand_name
                );

            const count =
                Number(
                    product.instrument_count || 0
                );


            const displayName =
                modelNumber ||
                productCode ||
                "Unnamed Model";


            const subtitleParts = [];


            if (brand) {
                subtitleParts.push(
                    brand
                );
            }


            if (productCode) {

                subtitleParts.push(
                    `Code: ${productCode}`
                );
            }


            const subtitle =
                subtitleParts.join(
                    " • "
                );


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "product-row";


            row.innerHTML = `

                <div class="product-main">

                    <div class="product-row-icon">
                        ⚖
                    </div>

                    <div>
                        <div class="product-name">
                            ${escapeHtml(displayName)}
                        </div>

                        ${
                            subtitle
                                ? `
                                    <div class="product-subtitle">
                                        ${escapeHtml(subtitle)}
                                    </div>
                                  `
                                : ""
                        }
                    </div>

                </div>


                <div class="instrument-count">

                    ${count}
                    ${count === 1
                        ? "instrument"
                        : "instruments"}

                </div>


                <button
                    type="button"
                    class="view-button"
                    data-model-id="${escapeHtml(
                        value(product.model_id)
                    )}"
                >
                    View
                </button>

            `;


            const button =
                row.querySelector(
                    ".view-button"
                );


            button.addEventListener(
                "click",
                () => {

                    openModelInstruments(
                        product
                    );

                }
            );


            productList.appendChild(
                row
            );
        }
    );


    showElement(productListCard);
}


/* =========================================================
   ERROR
   ========================================================= */

function showProductsError(
    message
) {

    productsErrorMessage.textContent =
        message;

    hideElement(productsLoading);
    hideElement(productsEmpty);
    hideElement(productListCard);

    showElement(productsError);
}


/* =========================================================
   REGISTER DATA
   ========================================================= */

async function loadRegisterData() {

    const manufacturerId =
        getManufacturerId();


    if (!manufacturerId) {
        throw new Error(
            "Manufacturer session not found."
        );
    }


    const [
        models,
        types,
        categories
    ] = await Promise.all([

        callRpc(
            "manufacturer_get_products",
            {
                p_manufacturer_id:
                    manufacturerId
            }
        ),

        callRpc(
            "manufacturer_get_instrument_types"
        ),

        callRpc(
            "manufacturer_get_instrument_categories"
        )

    ]);


    products =
        Array.isArray(models)
            ? models
            : models
                ? [models]
                : [];


    instrumentTypes =
        Array.isArray(types)
            ? types
            : types
                ? [types]
                : [];


    instrumentCategories =
        Array.isArray(categories)
            ? categories
            : categories
                ? [categories]
                : [];


    populateProductDropdown();

    populateTypeDropdown();

    populateStateDropdown();
}


/* =========================================================
   PRODUCT DROPDOWN
   ========================================================= */

function populateProductDropdown() {

    const select =
        document.getElementById(
            "product-select"
        );


    select.innerHTML = `
        <option value="">
            Select your product / model
        </option>
    `;


    products.forEach(
        product => {

            const id =
                value(
                    product.model_id
                );

            if (!id) {
                return;
            }


            const model =
                value(
                    product.model_number
                ) ||
                value(
                    product.product_code
                ) ||
                "Unnamed Model";


            const brand =
                value(
                    product.brand_name
                );

            const code =
                value(
                    product.product_code
                );


            const details = [];


            if (brand) {
                details.push(brand);
            }


            if (code) {
                details.push(
                    `Code: ${code}`
                );
            }


            const option =
                document.createElement(
                    "option"
                );


            option.value = id;


            option.textContent =
                details.length
                    ? `${model} • ${details.join(" • ")}`
                    : model;


            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   TYPE DROPDOWN
   ========================================================= */

function populateTypeDropdown() {

    const select =
        document.getElementById(
            "instrument-type"
        );


    select.innerHTML = `
        <option value="">
            Select instrument type
        </option>
    `;


    instrumentTypes.forEach(
        type => {

            const id =
                value(type.id);

            const name =
                value(type.name);


            if (!id) {
                return;
            }


            const option =
                document.createElement(
                    "option"
                );


            option.value = id;

            option.textContent =
                name ||
                "Unnamed type";


            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   CATEGORY DROPDOWN
   ========================================================= */

function populateCategoryDropdown(
    typeId
) {

    const select =
        document.getElementById(
            "instrument-category"
        );


    select.innerHTML = "";


    if (!typeId) {

        select.disabled = true;

        select.innerHTML = `
            <option value="">
                Select instrument type first
            </option>
        `;

        return;
    }


    const categories =
        instrumentCategories.filter(
            category =>
                value(
                    category.instrument_type_id
                ) === value(typeId)
        );


    select.disabled =
        categories.length === 0;


    select.innerHTML = `
        <option value="">
            ${
                categories.length
                    ? "Select instrument category"
                    : "No categories available"
            }
        </option>
    `;


    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                value(category.id);


            option.textContent =
                value(category.name) ||
                "Unnamed category";


            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   PRODUCT SELECTION
   ========================================================= */

function handleProductSelection() {

    const select =
        document.getElementById(
            "product-select"
        );


    const selected =
        products.find(
            product =>
                value(
                    product.model_id
                ) === select.value
        );


    currentProduct =
        selected || null;


    document.getElementById(
        "brand-display"
    ).textContent =
        selected
            ? value(selected.brand_name) || "—"
            : "—";


    document.getElementById(
        "model-display"
    ).textContent =
        selected
            ? value(selected.model_number) || "—"
            : "—";


    document.getElementById(
        "product-code-display"
    ).textContent =
        selected
            ? value(selected.product_code) || "—"
            : "—";


    const nameInput =
        document.getElementById(
            "instrument-name"
        );


    if (
        selected &&
        !nameInput.value.trim()
    ) {

        nameInput.value =
            value(
                selected.model_number
            ) ||
            value(
                selected.product_code
            );
    }
}


/* =========================================================
   STATE / DISTRICT
   ========================================================= */

const STATES = [

    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"

];


const DISTRICTS = {

    "West Bengal": [
        "Alipurduar",
        "Bankura",
        "Paschim Bardhaman",
        "Purba Bardhaman",
        "Birbhum",
        "Cooch Behar",
        "Dakshin Dinajpur",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Maldah",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "Paschim Medinipur",
        "Purba Medinipur",
        "Purulia",
        "South 24 Parganas",
        "Uttar Dinajpur"
    ],

    "Delhi": [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi"
    ],

    "Chandigarh": [
        "Chandigarh"
    ],

    "Goa": [
        "North Goa",
        "South Goa"
    ],

    "Ladakh": [
        "Kargil",
        "Leh"
    ],

    "Lakshadweep": [
        "Lakshadweep"
    ],

    "Puducherry": [
        "Karaikal",
        "Mahe",
        "Puducherry",
        "Yanam"
    ],

    "Andaman and Nicobar Islands": [
        "Nicobar",
        "North and Middle Andaman",
        "South Andaman"
    ]

};


function populateStateDropdown() {

    const select =
        document.getElementById(
            "manufacturing-state"
        );


    select.innerHTML = `
        <option value="">
            Select state
        </option>
    `;


    STATES.forEach(
        state => {

            const option =
                document.createElement(
                    "option"
                );

            option.value = state;

            option.textContent = state;

            select.appendChild(
                option
            );
        }
    );
}


function populateDistrictDropdown(
    state
) {

    const select =
        document.getElementById(
            "manufacturing-district"
        );


    const districts =
        DISTRICTS[state] || [];


    select.innerHTML = "";


    if (!state) {

        select.disabled = true;

        select.innerHTML = `
            <option value="">
                Select state first
            </option>
        `;

        return;
    }


    if (!districts.length) {

        select.disabled = false;

        select.innerHTML = `
            <option value="">
                Enter district manually in details
            </option>
        `;

        return;
    }


    select.disabled = false;


    select.innerHTML = `
        <option value="">
            Select district
        </option>
    `;


    districts.forEach(
        district => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                district;

            option.textContent =
                district;

            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   REGISTER INSTRUMENT
   ========================================================= */

async function registerInstrument(
    event
) {

    event.preventDefault();


    const form =
        document.getElementById(
            "register-form"
        );


    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }


    if (!currentProduct) {

        showFormMessage(
            "register-message",
            "Please select a product/model.",
            "error"
        );

        return;
    }


    const typeId =
        document.getElementById(
            "instrument-type"
        ).value;


    const categoryId =
        document.getElementById(
            "instrument-category"
        ).value;


    if (!typeId || !categoryId) {

        showFormMessage(
            "register-message",
            "Please select instrument type and category.",
            "error"
        );

        return;
    }


    const manufacturerId =
        getManufacturerId();


    const body = {

        p_manufacturer_id:
            manufacturerId,

        p_instrument_type_id:
            typeId,

        p_instrument_category_id:
            categoryId,

        p_model_id:
            value(
                currentProduct.model_id
            ),

        p_instrument_name:
            document.getElementById(
                "instrument-name"
            ).value.trim(),

        p_serial_number:
            document.getElementById(
                "serial-number"
            ).value.trim(),

        p_batch_lot_number:
            nullableValue(
                document.getElementById(
                    "batch-number"
                ).value
            ),

        p_manufacturing_date:
            document.getElementById(
                "manufacturing-date"
            ).value,

        p_country_of_manufacture:
            "India",

        p_manufacturing_state:
            nullableValue(
                document.getElementById(
                    "manufacturing-state"
                ).value
            ),

        p_manufacturing_district:
            nullableValue(
                document.getElementById(
                    "manufacturing-district"
                ).value
            ),

        p_manufacturing_location:
            nullableValue(
                document.getElementById(
                    "manufacturing-location"
                ).value
            ),

        p_product_code:
            nullableValue(
                currentProduct.product_code
            )

    };


    const submitButton =
        document.getElementById(
            "submit-register"
        );


    submitButton.disabled = true;

    submitButton.textContent =
        "Registering...";


    try {

        const result =
            await callRpc(
                "register_instrument",
                body
            );


        let uid = "";


        if (
            Array.isArray(result) &&
            result.length &&
            typeof result[0] === "object"
        ) {

            uid =
                value(
                    result[0].instrument_uid
                );

        } else if (
            result &&
            typeof result === "object"
        ) {

            uid =
                value(
                    result.instrument_uid
                );
        }


        if (!uid) {

            throw new Error(
                "Instrument registered, but the Instrument UID was not returned."
            );
        }


        closeModal(
            "register-modal"
        );


        form.reset();


        currentProduct = null;


        resetRegisterFields();


        await loadProducts();


        openQrModal(uid);


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        showFormMessage(
            "register-message",
            error.message ||
            "Unable to register instrument.",
            "error"
        );

    } finally {

        submitButton.disabled = false;

        submitButton.textContent =
            "Register Instrument";
    }
}


/* =========================================================
   MODEL INSTRUMENTS
   ========================================================= */

async function openModelInstruments(
    product
) {

    currentProduct =
        product;


    document.getElementById(
        "instruments-modal-title"
    ).textContent =
        value(
            product.model_number
        ) ||
        value(
            product.product_code
        ) ||
        "Model Instruments";


    openModal(
        "instruments-modal"
    );


    const loading =
        document.getElementById(
            "instruments-loading"
        );

    const empty =
        document.getElementById(
            "instruments-empty"
        );

    const list =
        document.getElementById(
            "instrument-list"
        );


    showElement(loading);

    hideElement(empty);
    hideElement(list);


    try {

        const result =
            await callRpc(
                "admin_get_instruments"
            );


        const rows =
            Array.isArray(result)
                ? result
                : result
                    ? [result]
                    : [];


        const manufacturerId =
            getManufacturerId();


        const modelNumber =
            value(
                product.model_number
            );


        currentInstruments =
            rows
                .filter(
                    item =>
                        value(
                            item.manufacturer_id
                        ) === manufacturerId &&
                        value(
                            item.model_number
                        ) === modelNumber
                );


        renderInstruments();


    } catch (error) {

        console.error(
            "Instrument loading error:",
            error
        );


        list.innerHTML = `

            <div class="state-box">

                <div class="state-icon">
                    !
                </div>

                <h3>
                    Unable to load instruments
                </h3>

                <p>
                    ${escapeHtml(
                        error.message ||
                        "Something went wrong."
                    )}
                </p>

            </div>

        `;

        showElement(list);

    } finally {

        hideElement(loading);
    }
}


/* =========================================================
   RENDER INSTRUMENTS
   ========================================================= */

function renderInstruments() {

    const list =
        document.getElementById(
            "instrument-list"
        );

    const empty =
        document.getElementById(
            "instruments-empty"
        );


    list.innerHTML = "";


    if (!currentInstruments.length) {

        showElement(empty);

        return;
    }


    hideElement(empty);


    currentInstruments.forEach(
        instrument => {

            const id =
                value(
                    instrument.id
                );

            const uid =
                value(
                    instrument.instrument_uid
                );

            const name =
                value(
                    instrument.instrument_name
                ) ||
                "Instrument";

            const status =
                value(
                    instrument.registration_status
                );


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "instrument-card";


            card.innerHTML = `

                <div class="instrument-top">

                    <div class="instrument-icon">
                        ⚖
                    </div>

                    <div class="instrument-heading">

                        <h3>
                            ${escapeHtml(name)}
                        </h3>

                        <div class="instrument-uid">
                            UID:
                            ${escapeHtml(uid || "—")}
                        </div>

                    </div>

                    ${
                        status
                            ? `
                                <div class="instrument-status">
                                    ${escapeHtml(status)}
                                </div>
                              `
                            : ""
                    }

                </div>


                <div class="instrument-info-grid">

                    ${infoItem(
                        "Serial Number",
                        instrument.serial_number
                    )}

                    ${infoItem(
                        "Brand",
                        instrument.brand_name
                    )}

                    ${infoItem(
                        "Model",
                        instrument.model_number
                    )}

                    ${infoItem(
                        "Product Code",
                        instrument.product_code
                    )}

                    ${infoItem(
                        "Manufacturing Date",
                        formatDate(
                            instrument.manufacturing_date
                        )
                    )}

                    ${infoItem(
                        "Location",
                        instrument.manufacturing_location
                    )}

                </div>


                <div class="instrument-actions">

                    <button
                        type="button"
                        class="instrument-action"
                        data-action="view"
                    >
                        View
                    </button>

                    <button
                        type="button"
                        class="instrument-action"
                        data-action="edit"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="instrument-action"
                        data-action="qr"
                    >
                        QR
                    </button>

                    <button
                        type="button"
                        class="instrument-action delete"
                        data-action="delete"
                    >
                        Delete
                    </button>

                </div>

            `;


            card
                .querySelector(
                    '[data-action="view"]'
                )
                .addEventListener(
                    "click",
                    () =>
                        openInstrumentDetails(
                            instrument
                        )
                );


            card
                .querySelector(
                    '[data-action="edit"]'
                )
                .addEventListener(
                    "click",
                    () =>
                        openEditModal(
                            instrument
                        )
                );


            card
                .querySelector(
                    '[data-action="qr"]'
                )
                .addEventListener(
                    "click",
                    () =>
                        openQrModal(
                            uid
                        )
                );


            card
                .querySelector(
                    '[data-action="delete"]'
                )
                .addEventListener(
                    "click",
                    () =>
                        deleteInstrument(
                            instrument
                        )
                );


            list.appendChild(
                card
            );
        }
    );


    showElement(list);
}


/* =========================================================
   INFO ITEM
   ========================================================= */

function infoItem(
    label,
    rawValue
) {

    return `

        <div class="info-item">

            <span>
                ${escapeHtml(label)}
            </span>

            <strong>
                ${escapeHtml(
                    value(rawValue) || "—"
                )}
            </strong>

        </div>

    `;
}


/* =========================================================
   DETAILS
   ========================================================= */

function openInstrumentDetails(
    instrument
) {

    currentInstrument =
        instrument;


    document.getElementById(
        "details-title"
    ).textContent =
        value(
            instrument.instrument_uid
        ) ||
        "Instrument";


    const content =
        document.getElementById(
            "details-content"
        );


    content.innerHTML = `

        <div class="details-group">

            <h3>
                Instrument Information
            </h3>

            ${detailRow(
                "Instrument UID",
                instrument.instrument_uid
            )}

            ${detailRow(
                "Instrument Name",
                instrument.instrument_name
            )}

            ${detailRow(
                "Instrument Type",
                instrument.instrument_type
            )}

            ${detailRow(
                "Category",
                instrument.instrument_category
            )}

            ${detailRow(
                "Brand",
                instrument.brand_name
            )}

            ${detailRow(
                "Model Number",
                instrument.model_number
            )}

            ${detailRow(
                "Serial Number",
                instrument.serial_number
            )}

            ${detailRow(
                "Product Code",
                instrument.product_code
            )}

            ${detailRow(
                "Batch / Lot",
                instrument.batch_lot_number
            )}

        </div>


        <div class="details-group">

            <h3>
                Manufacturing Information
            </h3>

            ${detailRow(
                "Manufacturing Date",
                formatDate(
                    instrument.manufacturing_date
                )
            )}

            ${detailRow(
                "Country",
                instrument.country_of_manufacture
            )}

            ${detailRow(
                "State",
                instrument.manufacturing_state
            )}

            ${detailRow(
                "District",
                instrument.manufacturing_district
            )}

            ${detailRow(
                "Location",
                instrument.manufacturing_location
            )}

        </div>


        <div class="details-group">

            <h3>
                Registration
            </h3>

            ${detailRow(
                "Registration Status",
                instrument.registration_status
            )}

            ${detailRow(
                "Status Code",
                instrument.status_code
            )}

            ${detailRow(
                "Created At",
                instrument.created_at
            )}

            ${detailRow(
                "Updated At",
                instrument.updated_at
            )}

        </div>

    `;


    openModal(
        "details-modal"
    );
}


function detailRow(
    label,
    rawValue
) {

    return `

        <div class="details-row">

            <span>
                ${escapeHtml(label)}
            </span>

            <strong>
                ${escapeHtml(
                    value(rawValue) || "—"
                )}
            </strong>

        </div>

    `;
}


/* =========================================================
   EDIT
   ========================================================= */

function openEditModal(
    instrument
) {

    currentInstrument =
        instrument;


    document.getElementById(
        "edit-id"
    ).value =
        value(instrument.id);


    document.getElementById(
        "edit-uid"
    ).textContent =
        value(
            instrument.instrument_uid
        ) || "—";


    document.getElementById(
        "edit-type"
    ).textContent =
        value(
            instrument.instrument_type
        ) || "—";


    document.getElementById(
        "edit-category"
    ).textContent =
        value(
            instrument.instrument_category
        ) || "—";


    document.getElementById(
        "edit-name"
    ).value =
        value(
            instrument.instrument_name
        );


    document.getElementById(
        "edit-brand"
    ).textContent =
        value(
            instrument.brand_name
        ) || "—";


    document.getElementById(
        "edit-model"
    ).textContent =
        value(
            instrument.model_number
        ) || "—";


    document.getElementById(
        "edit-product-code"
    ).textContent =
        value(
            instrument.product_code
        ) || "—";


    document.getElementById(
        "edit-serial"
    ).value =
        value(
            instrument.serial_number
        );


    document.getElementById(
        "edit-batch"
    ).value =
        value(
            instrument.batch_lot_number
        );


    document.getElementById(
        "edit-date"
    ).value =
        formatDate(
            instrument.manufacturing_date
        ) === "—"
            ? ""
            : formatDate(
                instrument.manufacturing_date
            );


    document.getElementById(
        "edit-country"
    ).value =
        value(
            instrument.country_of_manufacture
        );


    document.getElementById(
        "edit-state"
    ).value =
        value(
            instrument.manufacturing_state
        );


    document.getElementById(
        "edit-district"
    ).value =
        value(
            instrument.manufacturing_district
        );


    document.getElementById(
        "edit-location"
    ).value =
        value(
            instrument.manufacturing_location
        );


    openModal(
        "edit-modal"
    );
}


/* =========================================================
   SAVE EDIT
   ========================================================= */

async function saveInstrumentEdit(
    event
) {

    event.preventDefault();


    if (!currentInstrument) {
        return;
    }


    const form =
        document.getElementById(
            "edit-form"
        );


    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }


    const button =
        document.getElementById(
            "save-edit"
        );


    const data = {

        p_instrument_id:
            currentInstrument.id,

        p_instrument_type:
            value(
                currentInstrument.instrument_type
            ),

        p_instrument_category:
            value(
                currentInstrument.instrument_category
            ),

        p_instrument_name:
            document.getElementById(
                "edit-name"
            ).value.trim(),

        p_brand_name:
            value(
                currentInstrument.brand_name
            ),

        p_model_number:
            value(
                currentInstrument.model_number
            ),

        p_serial_number:
            document.getElementById(
                "edit-serial"
            ).value.trim(),

        p_product_code:
            nullableValue(
                currentInstrument.product_code
            ),

        p_batch_lot_number:
            nullableValue(
                document.getElementById(
                    "edit-batch"
                ).value
            ),

        p_manufacturing_date:
            document.getElementById(
                "edit-date"
            ).value,

        p_country_of_manufacture:
            document.getElementById(
                "edit-country"
            ).value.trim(),

        p_manufacturing_state:
            nullableValue(
                document.getElementById(
                    "edit-state"
                ).value
            ),

        p_manufacturing_district:
            nullableValue(
                document.getElementById(
                    "edit-district"
                ).value
            ),

        p_manufacturing_location:
            nullableValue(
                document.getElementById(
                    "edit-location"
                ).value
            ),

        p_registration_status:
            value(
                currentInstrument.registration_status
            ),

        p_status_code:
            value(
                currentInstrument.status_code
            )

    };


    button.disabled = true;

    button.textContent =
        "Saving...";


    try {

        await callRpc(
            "admin_update_instrument",
            data
        );


        closeModal(
            "edit-modal"
        );


        await openModelInstruments(
            currentProduct
        );


        await loadProducts();


    } catch (error) {

        console.error(
            "Edit error:",
            error
        );


        showFormMessage(
            "edit-message",
            error.message ||
            "Unable to save changes.",
            "error"
        );

    } finally {

        button.disabled = false;

        button.textContent =
            "Save Changes";
    }
}


/* =========================================================
   DELETE
   ========================================================= */

async function deleteInstrument(
    instrument
) {

    const id =
        value(instrument.id);

    const uid =
        value(
            instrument.instrument_uid
        );


    if (!id) {

        alert(
            "Instrument ID is missing."
        );

        return;
    }


    const confirmed =
        window.confirm(
            `Delete instrument ${uid || ""}?\n\nThis action cannot be undone.`
        );


    if (!confirmed) {
        return;
    }


    try {

        await callRpc(
            "admin_delete_instrument",
            {
                p_instrument_id: id
            }
        );


        alert(
            "Instrument deleted successfully."
        );


        await openModelInstruments(
            currentProduct
        );


        await loadProducts();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            error.message ||
            "Unable to delete instrument."
        );
    }
}


/* =========================================================
   QR
   ========================================================= */

function openQrModal(
    uid
) {

    uid =
        value(uid);


    if (!uid) {

        alert(
            "Instrument UID is missing."
        );

        return;
    }


    document.getElementById(
        "qr-uid"
    ).textContent =
        uid;


    const qrBox =
        document.getElementById(
            "qr-box"
        );


    qrBox.innerHTML = "";


    new QRCode(
        qrBox,
        {
            text: uid,

            width: 230,

            height: 230,

            colorDark: "#103F58",

            colorLight: "#FFFFFF",

            correctLevel:
                QRCode.CorrectLevel.H
        }
    );


    openModal(
        "qr-modal"
    );
}


/* =========================================================
   QR SAVE
   ========================================================= */

function saveQr() {

    const uid =
        value(
            document.getElementById(
                "qr-uid"
            ).textContent
        );


    const image =
        document.querySelector(
            "#qr-box img"
        );


    if (!image) {
        return;
    }


    const link =
        document.createElement(
            "a"
        );


    link.href =
        image.src;


    link.download =
        `SahiMaap_${uid}.png`;


    link.click();
}


/* =========================================================
   QR SHARE
   ========================================================= */

async function shareQr() {

    const uid =
        value(
            document.getElementById(
                "qr-uid"
            ).textContent
        );


    const image =
        document.querySelector(
            "#qr-box img"
        );


    if (
        !image ||
        !navigator.share
    ) {

        alert(
            "Sharing is not supported by this browser. Use Save instead."
        );

        return;
    }


    try {

        const response =
            await fetch(
                image.src
            );


        const blob =
            await response.blob();


        const file =
            new File(
                [blob],
                `SahiMaap_${uid}.png`,
                {
                    type: "image/png"
                }
            );


        await navigator.share(
            {
                title:
                    "SahiMaap Instrument QR",

                text:
                    `SahiMaap Instrument UID: ${uid}`,

                files: [file]
            }
        );


    } catch (error) {

        console.error(
            "Share error:",
            error
        );
    }
}


/* =========================================================
   QR PRINT
   ========================================================= */

function printQr() {

    const uid =
        value(
            document.getElementById(
                "qr-uid"
            ).textContent
        );


    const image =
        document.querySelector(
            "#qr-box img"
        );


    if (!image) {
        return;
    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=700,height=800"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the QR code."
        );

        return;
    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                SahiMaap Instrument
            </title>

            <style>

                body {
                    margin: 0;
                    min-height: 100vh;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font-family:
                        "Segoe UI",
                        Arial,
                        sans-serif;

                    color: #103F58;
                }

                .sheet {
                    text-align: center;
                }

                h1 {
                    font-size: 25px;
                    margin-bottom: 20px;
                }

                img {
                    width: 230px;
                    height: 230px;
                }

                .uid {
                    margin-top: 18px;

                    font-size: 19px;
                    font-weight: 800;

                    letter-spacing: 0.05em;
                }

                p {
                    color: #708792;
                    font-size: 12px;
                }

            </style>

        </head>

        <body>

            <div class="sheet">

                <h1>
                    SahiMaap Instrument
                </h1>

                <img
                    src="${image.src}"
                >

                <div class="uid">
                    ${escapeHtml(uid)}
                </div>

                <p>
                    Scan to verify this instrument.
                </p>

            </div>

        </body>

        </html>

    `);


    printWindow.document.close();


    printWindow.onload =
        () => {

            printWindow.focus();

            printWindow.print();

        };
}


/* =========================================================
   RESET REGISTER FORM
   ========================================================= */

function resetRegisterFields() {

    const category =
        document.getElementById(
            "instrument-category"
        );

    const district =
        document.getElementById(
            "manufacturing-district"
        );


    document.getElementById(
        "brand-display"
    ).textContent = "—";


    document.getElementById(
        "model-display"
    ).textContent = "—";


    document.getElementById(
        "product-code-display"
    ).textContent = "—";


    category.disabled = true;

    category.innerHTML = `
        <option value="">
            Select instrument type first
        </option>
    `;


    district.disabled = true;

    district.innerHTML = `
        <option value="">
            Select state first
        </option>
    `;
}


/* =========================================================
   FORM MESSAGE
   ========================================================= */

function showFormMessage(
    elementId,
    message,
    type
) {

    const element =
        document.getElementById(
            elementId
        );


    element.textContent =
        message;


    element.className =
        `form-message ${type}`;


    element.classList.remove(
        "hidden"
    );
}


function hideFormMessage(
    elementId
) {

    const element =
        document.getElementById(
            elementId
        );


    element.classList.add(
        "hidden"
    );
}


/* =========================================================
   NULLABLE VALUE
   ========================================================= */

function nullableValue(
    rawValue
) {

    const text =
        value(rawValue);

    return text
        ? text
        : null;
}


/* =========================================================
   MODAL HELPERS
   ========================================================= */

function openModal(
    id
) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "hidden"
    );

    document.body.style.overflow =
        "hidden";
}


function closeModal(
    id
) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";
}


function showElement(
    element
) {

    if (element) {
        element.classList.remove(
            "hidden"
        );
    }
}


function hideElement(
    element
) {

    if (element) {
        element.classList.add(
            "hidden"
        );
    }
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {


        /* -------------------------------------------------
           SESSION
           ------------------------------------------------- */

        if (!getManufacturerId()) {

            window.location.replace(
                "login.html"
            );

            return;
        }


        /* -------------------------------------------------
           PRODUCTS
           ------------------------------------------------- */

        document
            .getElementById(
                "refresh-products"
            )
            .addEventListener(
                "click",
                loadProducts
            );


        document
            .getElementById(
                "retry-products"
            )
            .addEventListener(
                "click",
                loadProducts
            );


        /* -------------------------------------------------
           REGISTER
           ------------------------------------------------- */

        document
            .getElementById(
                "register-instrument-button"
            )
            .addEventListener(
                "click",
                async () => {

                    openModal(
                        "register-modal"
                    );

                    try {

                        await loadRegisterData();

                    } catch (error) {

                        console.error(
                            "Register data error:",
                            error
                        );

                        showFormMessage(
                            "register-message",
                            error.message ||
                            "Unable to load registration data.",
                            "error"
                        );
                    }
                }
            );


        document
            .getElementById(
                "product-select"
            )
            .addEventListener(
                "change",
                handleProductSelection
            );


        document
            .getElementById(
                "instrument-type"
            )
            .addEventListener(
                "change",
                event =>
                    populateCategoryDropdown(
                        event.target.value
                    )
            );


        document
            .getElementById(
                "manufacturing-state"
            )
            .addEventListener(
                "change",
                event =>
                    populateDistrictDropdown(
                        event.target.value
                    )
            );


        document
            .getElementById(
                "register-form"
            )
            .addEventListener(
                "submit",
                registerInstrument
            );


        /* -------------------------------------------------
           EDIT
           ------------------------------------------------- */

        document
            .getElementById(
                "edit-form"
            )
            .addEventListener(
                "submit",
                saveInstrumentEdit
            );


        /* -------------------------------------------------
           CLOSE BUTTONS
           ------------------------------------------------- */

        document
            .getElementById(
                "close-register-modal"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "register-modal"
                    )
            );


        document
            .getElementById(
                "cancel-register"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "register-modal"
                    )
            );


        document
            .getElementById(
                "close-instruments-modal"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "instruments-modal"
                    )
            );


        document
            .getElementById(
                "close-details-modal"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "details-modal"
                    )
            );


        document
            .getElementById(
                "close-details-button"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "details-modal"
                    )
            );


        document
            .getElementById(
                "close-edit-modal"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "edit-modal"
                    )
            );


        document
            .getElementById(
                "cancel-edit"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "edit-modal"
                    )
            );


        document
            .getElementById(
                "close-qr-modal"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "qr-modal"
                    )
            );


        document
            .getElementById(
                "qr-done"
            )
            .addEventListener(
                "click",
                () =>
                    closeModal(
                        "qr-modal"
                    )
            );


        /* -------------------------------------------------
           QR
           ------------------------------------------------- */

        document
            .getElementById(
                "save-qr"
            )
            .addEventListener(
                "click",
                saveQr
            );


        document
            .getElementById(
                "share-qr"
            )
            .addEventListener(
                "click",
                shareQr
            );


        document
            .getElementById(
                "print-qr"
            )
            .addEventListener(
                "click",
                printQr
            );


        /* -------------------------------------------------
           BACKDROP CLOSE
           ------------------------------------------------- */

        document
            .querySelectorAll(
                ".modal-overlay"
            )
            .forEach(
                overlay => {

                    overlay.addEventListener(
                        "click",
                        event => {

                            if (
                                event.target ===
                                overlay
                            ) {

                                overlay.classList.add(
                                    "hidden"
                                );

                                document.body.style.overflow =
                                    "";
                            }
                        }
                    );

                }
            );


        /* -------------------------------------------------
           ESCAPE
           ------------------------------------------------- */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !==
                    "Escape"
                ) {
                    return;
                }


                document
                    .querySelectorAll(
                        ".modal-overlay:not(.hidden)"
                    )
                    .forEach(
                        modal => {

                            modal.classList.add(
                                "hidden"
                            );

                        }
                    );


                document.body.style.overflow =
                    "";
            }
        );


        /* -------------------------------------------------
           INITIAL LOAD
           ------------------------------------------------- */

        await loadProducts();

    }
);