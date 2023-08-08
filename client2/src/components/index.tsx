//Masters
"use client";
export { default as Head } from "./masters/head";
export { default as Master } from "./masters/master";
export { default as Main } from "./masters/main";
export { default as Header } from "./masters/header";
export { default as Footer } from "./masters/footer";
export { default as Section } from "./masters/section";
export { default as Hero } from "./masters/hero";

export { default as SimpleHeader } from "./masters/simpleHeader";
export { default as ScrollToTop } from "./masters/scrollToTop";
export { default as BecomeSeller } from "./masters/becomeSeller";
export { default as PostBeat } from "./client/postBeat";
export { managePostBeat } from "./client/postBeat";
export { default as EditBeat } from "./masters/editBeat";
export { manageEditBeat } from "./masters/editBeat";
export { default as Loader } from "./masters/loader";

//MiniCart
export { default as MiniCart } from "./miniCart/miniCart";
export { default as MiniCartItem } from "./miniCart/miniCartItem";

//Common
export { default as Logo } from "./common/logo";
export { default as MultiSelect } from "./common/multiSelect";
export { default as Select } from "./common/select";
export { default as TextArea } from "./common/textArea";
export { default as Switch } from "./common/switch";
export { default as Button } from "./common/button";
export { default as Input } from "./common/input";
export { default as CheckboxGroup } from "./common/checkboxGroup";
export { default as ArrowLabel } from "./common/arrowLabel";
export { default as MinMax } from "./common/minMax";
export { default as SoftDeleteSwitch } from "./common/softDeleteSwitch";
export { default as SwitchForm } from "./common/switchForm";
export { default as FormAdmin } from "./common/adminForm"; //creado pero sin colocar (SoftDelete, SwitchForm)
export { default as ValidationEditUsers } from "./common/validationEditUsers";
export { default as ReviewForm } from "./common/reviewForm";
export { default as SetUser } from "./common/setUser";
export { default as Hamburger } from "./masters/hamburguer";
export { default as LandBot } from "./common/landBot";
export { default as ChatbotWindow } from "./common/chatBotWindow";


//Modal
export { default as ModalMinMax } from "./modal/modalMinMax";
export { default as BeatBottomSheetFilteringWithHeader } from "./beat/beatBottomSheetFilteringWithHeader";
export { default as DynamicButtonsForBottomSheet } from "./client/dynamicButtonsForBottomSheet";
export { default as MiniModalBox } from "./modal/miniModalBox";
export { default as ModalBoxForNav } from "./modal/modalBoxForNav";
export { default as ModalPopUp } from "./modal/modalPopup";
export { default as ModalTables } from "./modal/modalTables";

//Auth
export { default as GoogleButton } from "./auth/googleButton";
export { default as AuthLayout } from "./auth/authLayout";
export { default as HOC } from "./auth/hoc";

//Help
export { default as HelpContainer } from "./help/helpContainer";
export { default as FaqsGrid } from "./help/faqsGrid";
export { default as FaqsItem } from "./help/faqItem";

//Beats
export { default as BeatBottomSheet } from "./beat/beatBottomSheet";
export { default as BeatRightSheet } from "./beat/beatRightSheet";
export { default as BeatDetailSideBar } from "./beat/beatDetailSideBar";
export { default as BeatsSpecialSection } from "./shop/beatsSpecialSection";
export { default as BeatCardGrid } from "./beat/beatCardGrid";
export { default as BeatFilters } from "./shop/beatFilters";
export { default as BeatCard } from "./shop/beatCard";
export { default as NewBeatCardGrid } from "./beat/newBeatCardGrid";
export { default as BeatShopSectionForClient } from "./beat/beatShopSectionForClient";
export { default as BeatsRelatedSection } from "./beat/beatRelatedSection";
export { default as BeatCardFlex } from "./beat/beatCardFlex";

//beatDataComponents
export { default as AuthorName } from "./beat/beatDataComponents/authorName";
export { default as BeatPrice } from "./beat/beatDataComponents/beatPrice";
export { default as BeatTitle } from "./beat/beatDataComponents/beatTitle";
export { default as BeatImage } from "./beat/beatDataComponents/beatImage";
export { default as BeatBPM } from "./beat/beatDataComponents/BeatBPM";
export { default as BeatAudio } from "./beat/beatDataComponents/beatAudio";
export { default as AddToCart } from "./beat/beatDataComponents/addToCart";

//Client
export { default as UserBoxNav } from "./layout/userBoxNav";
export { default as ClientReview } from "./client/clientReviews";
export { default as BuyerNavGeneral } from "./client/buyerNavGeneral";

export { default as BuyerProfileLayout } from "./client/buyerProfileLayout";
export { default as ProfileCard } from "./client/profileCard";
export { default as FormCreateBeat } from "./client/formCreateBeat";
//clientDataComponents
export { default as ClientImage } from "./client/clientDataComponents/clientImage";

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
export { default as Nav } from "./layout/nav/nav";
export { default as Search } from "./layout/search";
export { default as ModalOnHover } from "./layout/modalOnHover";
export { default as NavModalItem } from "./layout/nav/navModalItem";
export { default as VerticalNav } from "./layout/nav/verticalNav";

//Tables
export { default as DynamicTable } from "./dynamicTable";

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
export { default as ReviewCardGrid } from "./client/reviewCardGrid";
export { default as RecoveryPasswordForm } from "./forms/recoveryPasswordForm";
export { default as BeatReviewPopup } from "./beat/beatReviewPopup";
export { default as EditReviewForm } from "./masters/editReview";

export { default as AdminMaster } from "./masters/adminMaster";
export { default as AdminHeaderBar } from "./masters/adminHeaderBar";
export { default as ImageCache } from "./common/imageCache";
export { default as DynamicTableLight } from "./dynamicTableLight";

//export { default as BeatImage } from "./beat/beatImage";
//export { default as Checkbox } from "./common/checkbox";

export { default as HamburgerAdmin } from "./dashboard/hamburgerAdmin";



//Shop
export { default as BeatsGrid } from "./shop/beatsGrid";
export { default as MultiBoldText } from "./shop/multiBoldText";
export { default as PaginateBeats } from "./shop/paginateBeats";
export { default as ReviewsGrid } from "./shop/paginateBeats";

//Settings
export { default as NavSettings } from "./settings/navSettings";
export { default as HeroSettings } from "./settings/heroSettings";