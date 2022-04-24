import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components';
import { NotFound, Home } from './views/';
// import your route components too

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

/*  <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
                <Route path="new" element={<NewTeamForm />} />
                <Route index element={<LeagueStandings />} />
            </Route>*/
