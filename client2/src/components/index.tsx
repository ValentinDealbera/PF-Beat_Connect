//Masters
"use client";

export { default as Hero } from "./common/hero";

export { default as SimpleHeader } from "./masters/simpleHeader";
export { default as BecomeSeller } from "./masters/becomeSeller";
export { default as PostBeat } from "./client/postBeat";
export { managePostBeat } from "./client/postBeat";
export { default as EditBeat } from "./masters/editBeat";
export { manageEditBeat } from "./masters/editBeat";
export { default as Loader } from "./masters/loader";

//MiniCart
export { default as MiniCart } from "./layout/miniCart/miniCart";
export { default as MiniCartItem } from "./layout/miniCart/miniCartItem";

//Common
export { default as Logo } from "./common/logo";
export { default as MultiSelect } from "./common/multiSelect";
export { default as Select } from "./common/select";
export { default as TextArea } from "./common/textArea";
export { default as Input } from "./common/input";
export { default as CheckboxGroup } from "./common/checkboxGroup";
export { default as ArrowLabel } from "./common/arrowLabel";
export { default as MinMax } from "./common/minMax";
export { default as SwitchForm } from "./common/switchForm";
export { default as FormAdmin } from "./forms/adminForm"; //creado pero sin colocar (SoftDelete, SwitchForm)
export { default as ValidationEditUsers } from "./validation/validationEditUsers";
export { default as ReviewForm } from "./forms/reviewForm";
export { default as Hamburger } from "./masters/hamburguer";
export { default as LandBot } from "./layout/landBot";
export { default as ChatbotWindow } from "./layout/landBot/chatBotWindow";

//Modal
export { default as ModalMinMax } from "./modal/modalMinMax";
export { default as BeatBottomSheetFilteringWithHeader } from "./client/beat/beatBottomSheetFilteringWithHeader";
export { default as DynamicButtonsForBottomSheet } from "./client/dynamicButtonsForBottomSheet";
export { default as MiniModalBox } from "./modal/miniModalBox";
export { default as ModalPopUp } from "./modal/modalPopup";
export { default as ModalTables } from "./modal/modalTables";

//Auth

//Beats
export { default as BeatBottomSheet } from "./modal/bottomSheet";
export { default as BeatRightSheet } from "./modal/rightSheet";
export { default as BeatDetailSideBar } from "./client/beat/beatDetailSideBar";

//Client

export { default as ClientReview } from "./client/review";
export { default as ClientBeatsIndexer } from "./client/clientBeatsIndexer";

export { default as ProfileCard } from "./client/profileCard";
export { default as FormCreateBeat } from "./forms/formCreateBeat";
//clientDataComponents

//Dashboard
export { default as SellerDashboardLayout } from "./dashboard/sellerDashboardLayout";
export { default as SellerDashboardNav } from "./dashboard/sellerDashboardNav";
export { default as SellerDashboardSidebar } from "./dashboard/sellerDashboardSidebar";
export { default as SellerDashboardTopBar } from "./dashboard/sellerDashboardTopBar";
export { default as IslandDashboard } from "./dashboard/islandDashboard";
export { default as SellerDashboardHeader } from "./dashboard/sellerDashboardHeader";
export { default as DashboardItem } from "./dashboard/dashboardItem";
export { default as ClientDashboardEdit } from "./dashboard/clientDashboardEdit";

//Layout

export { default as Search } from "./common/search";

//Tables
export { default as DynamicTable } from "./dynamicTable/dynamicTable";

//Funciones de los componentes

export { manageBecomeSeller } from "./masters/becomeSeller";

//Forms

export { default as FormColumn } from "./form/formColumn";
export { default as FormContainer } from "./form/formContainer";
export { default as FormRow } from "./form/formRow";
export { default as AdminCreateUserForm } from "./forms/adminCreateUser";
export { default as AdminCreateReviewForm } from "./forms/adminCreateReview";
export { default as AdminCreateBeatForm } from "./forms/adminCreateBeat";
export { default as EditClientForm } from "./forms/editClientForm";
export { default as EditPasswordForm } from "./forms/editPasswordForm";
export { default as RecoveryPasswordForm } from "./forms/recoveryPasswordForm";
export { default as BeatReviewPopup } from "./client/beatReviewPopup";
export { default as EditReviewForm } from "./masters/editReview";

export { default as AdminMaster } from "./masters/adminMaster";
export { default as AdminHeaderBar } from "./masters/adminHeaderBar";
export { default as DynamicTableLight } from "./dynamicTable/dynamicTableLight";

//export { default as BeatImage } from "./beat/beatImage";
//export { default as Checkbox } from "./common/checkbox";

export { default as HamburgerAdmin } from "./dashboard/hamburgerAdmin";

//------------------ NUEVO ------------------//

//Help
export { default as FaqsGrid } from "./help/faqsGrid";
export { default as FaqsItem } from "./help/faqItem";

//BeatCardComponents
export { default as AuthorName } from "./client/beat/beatCardComponents/authorName";
export { default as BeatPrice } from "./client/beat/beatCardComponents/beatPrice";
export { default as BeatTitle } from "./client/beat/beatCardComponents/beatTitle";
export { default as BeatImage } from "./client/beat/beatCardComponents/beatImage";
export { default as BeatBPM } from "./client/beat/beatCardComponents/BeatBPM";
export { default as BeatAudio } from "./client/beat/beatCardComponents/beatAudio";
export { default as AddToCart } from "./client/beat/beatCardComponents/addToCart";

//Shop
export { default as BeatsGrid } from "./shop/beatsGrid";
export { default as MultiBoldText } from "./shop/multiBoldText";
export { default as PaginateBeats } from "./shop/paginateBeats";
export { default as ReviewsGrid } from "./shop/paginateBeats";
export { default as BeatsSpecialSection } from "./shop/beatsSpecialSection";
export { default as BeatFilters } from "./shop/beatFilters";
export { default as BeatCard } from "./shop/beatCard";

//Settings
export { default as ClientSettingsIndexer } from "./settings/clientSettingsIndexer";
export { default as HeroSettings } from "./settings/heroSettings";

//Layout
export { default as LanguageChanger } from "./layout/languageChanger";
export { default as GoogleButton } from "./layout/googleButton";
export { default as Header } from "./layout/header";
export { default as Footer } from "./layout/footer";
export { default as Section } from "./layout/section";
export { default as UserBoxNav } from "./layout/userMenu";

//nav
export { default as NavigationModal } from "./layout/nav/navigationModal";
export { default as Nav } from "./layout/nav";
export { default as NavModalItem } from "./layout/nav/modalItem";
